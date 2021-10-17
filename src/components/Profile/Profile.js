import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, Text, Alert, TouchableOpacity, Platform, Image, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase';
import firebase from '../../../firebase';
import { styles } from './ProfileStyles';
import StatisticsCard from './StatisticsCard/StatisticsCard';

import * as ImagePicker from 'expo-image-picker';
import { primary } from '../../../colors';

const Profile = ({ navigation }) => {

    const [newReminder, setNewReminder] = useState(1);
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const user = firebaseAuth.auth().currentUser;
    const avatar = require('../../../assets/avatar.png');
    const dispatch = useDispatch();
    const passwordRef = useRef();
    const medicines = useSelector(state => state.medicines);
    const reminder = useSelector(state => state.daysLeft);
    const divided = medicines.reduce((array, item) => {
        array[item.active ? 'active' : 'inactive'].push(item);
        return array;
    }, { active: [], inactive: [] });

    const changeReminder = async () => {
        if (newReminder > 1)
            try {
                await AsyncStorage.setItem('reminder', newReminder);
                // Update storage
                dispatch({ type: 'SET_DAYS_LEFT', daysLeft: newReminder });
                setNewReminder(1);
                Alert.alert("ok!");
            } catch (error) {
                console.log(error.message)
            }
        else
            Alert.alert("Enter a positive number");
    }

    const changePassword = () => {
        var user = firebaseAuth.auth().currentUser;
        var credential = firebaseAuth.auth.EmailAuthProvider.credential(
            firebaseAuth.auth().currentUser.email,
            currentPassword
        );
        // Check for the password
        user.reauthenticateWithCredential(credential)
            .then(async function () {
                console.log('same password');
                try {
                    await firebase.changePassword(newPassword);
                    setCurrentPassword('');
                    setNewPassword('');
                    Alert.alert('Password changed');
                }
                catch (error) {
                    Alert.alert(error.message);
                }
            })
            .catch(error => Alert.alert(error.message));
    }

    const closeToEnd = (medicine) => {
        const today = Moment(new Date().setHours(0, 0, 0, 0));
        return (
            medicine.active &&
            Moment(medicine.endDate).diff(today, 'days') <= reminder
        );
    }

    const logout = () => {
        firebase.logout();
        dispatch({ type: 'SET_MEDICINES', medicines: [] });
        navigation.replace("LoginScreen");
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        console.log(result);
        Alert.alert("Upload started");
        handleImagePicked(result);
    };

    const handleImagePicked = async (pickerResult) => {
        try {
            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImage(pickerResult.uri)
                console.log(uploadUrl);
                firebase.updatePhotoURL(uploadUrl);
                Alert.alert("Image uploaded successfully");
            }
        }
        catch (error) {
            console.log(error.message);
            Alert.alert("upload failed");
        }
    }

    async function uploadImage(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const ref = firebaseAuth.storage().ref().child(user.email);
        const snapshot = await ref.put(blob);
        blob.close();
        return await snapshot.ref.getDownloadURL();
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                <View style={styles.header}>
                    <View style={styles.imageWrapper}>
                        <Image source={user.photoURL ? { uri: user.photoURL } : avatar} style={styles.image} />
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.uploadButton}
                            onPress={pickImage}
                        >
                            <Entypo name="camera" size={13} color={primary} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.username, styles.text]}>{user.displayName}</Text>
                    <Text style={[styles.email, styles.text]}>{user.email}</Text>
                    <Text style={styles.text}>Member since {Moment(firebase.getRegisterDate()).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Statistics</Text>
                    <View style={styles.statistics}>
                        <StatisticsCard
                            type="Total medicines"
                            value={medicines.length}
                        />
                        <StatisticsCard
                            type="Active"
                            value={divided.active.length}
                        />
                    </View>
                    <View style={styles.statistics}>
                        <StatisticsCard
                            type="Close to end"
                            value={medicines.filter(closeToEnd).length}
                        />
                        <StatisticsCard
                            type="Inactive"
                            value={divided.inactive.length}
                        />
                    </View>
                    <Text style={styles.title}>Reminder time</Text>
                    <View style={styles.itemContainer}>
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ color: 'black', marginBottom: 10 }}>
                                The reminder time will remind you a few days before the medicine is over. The default value is 15 days, but you can change it here.
                            </Text>
                            <Text style={{ marginBottom: 10 }}>Current value: {reminder}</Text>
                            <Text style={{ marginBottom: 5, textTransform: 'uppercase' }}>New value:</Text>
                        </View>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                placeholder="Enter a positive value..."
                                value={newReminder.toString()}
                                onChangeText={text => setNewReminder(text)}
                                keyboardType='number-pad'
                                style={styles.input}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => changeReminder()}
                            style={styles.button}
                        >
                            <Text style={[styles.text, styles.buttonLabel]}>
                                Set new reminder
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Change password</Text>
                    <View style={styles.itemContainer}>
                        <Text style={{ marginRight: 10, marginBottom: 20 }}>
                            If you with to update your password, you can do it here.
                        </Text>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                placeholder="Enter current password..."
                                value={currentPassword}
                                onChangeText={text => setCurrentPassword(text)}
                                style={styles.input}
                                returnKeyType='next'
                                secureTextEntry={!showCurrentPassword ? true : false}
                                onSubmitEditing={() => passwordRef.current.focus()}
                            />
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {!showCurrentPassword ?
                                    <Entypo name="eye" size={22} color="gray" />
                                    :
                                    <Entypo name="eye-with-line" size={22} color="gray" />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                placeholder="Enter new password..."
                                value={newPassword}
                                style={styles.input}
                                secureTextEntry={!showNewPassword ? true : false}
                                ref={passwordRef}
                                onChangeText={text => setNewPassword(text)}
                            />
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setShowNewPassword(!showNewPassword)}
                            >
                                {!showNewPassword ?
                                    <Entypo name="eye" size={22} color="gray" />
                                    :
                                    <Entypo name="eye-with-line" size={22} color="gray" />
                                }
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => changePassword()}
                            style={styles.button}
                        >
                            <Text style={[styles.text, styles.buttonLabel]}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Leave the app</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.button, { marginBottom: 20 }]}
                        onPress={() => logout()}
                    >
                        <Text style={[styles.text, styles.buttonLabel]}>Log out from your account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;