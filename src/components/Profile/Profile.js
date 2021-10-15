import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase';
import firebase from '../../../firebase';
import { styles } from './ProfileStyles';
import StatisticsCard from './StatisticsCard/StatisticsCard';

const Profile = ({ navigation }) => {

    const [newReminder, setNewReminder] = useState(1);
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
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
            Moment(medicine.endDate).diff(today, 'days') < reminder
        );
    }

    const logout = () => {
        firebase.logout();
        navigation.replace("Login");
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.letter}>
                        {firebase.getCurrentUsername().charAt(0).toUpperCase()}
                    </Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.text}>{firebase.getCurrentUsername()}</Text>
                    <Text style={styles.text}>{firebase.getCurrentEmail()}</Text>
                </View>
            </View> */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {/* <Text style={styles.title}>Profile deatils</Text>
                <View style={styles.itemContainer}>
                    <Text>Member since {Moment(firebase.getRegisterDate()).format('DD/MM/YYYY')}</Text>
                </View> */}
                <Text style={styles.title}>Set reminder time</Text>
                <View style={styles.itemContainer}>
                    <Text style={{ marginRight: 10, marginBottom: 20 }}>
                        The reminder time will remind you a few days before medicine is coming to an end. Default is 15.
                    </Text>
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
                        <Text style={styles.text}>Set</Text>
                    </TouchableOpacity>
                </View>
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
                <Text style={styles.title}>Change password</Text>
                <View style={styles.itemContainer}>
                    <Text style={{ marginRight: 10, marginBottom: 20 }}>
                        If you with to update your password, you can do it here
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
                        <Text style={styles.text}>Change</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Leave the app</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.button, { marginBottom: 20 }]}
                    onPress={() => logout()}
                >
                    <Text style={styles.text}>Log out from your account</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;