import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as firebaseAuth from 'firebase';
import firebase from '../../../firebase';
import { styles } from './ProfileStyles';
import StatisticsCard from './StatisticsCard/StatisticsCard';

const Profile = ({ navigation }) => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const passwordRef = useRef();
    const medicines = useSelector(state => state.medicines);
    const divided = medicines.reduce((array, item) => {
        array[item.active ? 'active' : 'inactive'].push(item);
        return array;
    }, { active: [], inactive: [] });

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

    const logout = () => {
        firebase.logout();
        navigation.replace("Login");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.letter}>
                        {firebase.getCurrentUsername().charAt(0).toUpperCase()}
                    </Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.text}>{firebase.getCurrentUsername()}</Text>
                    <Text style={styles.text}>{firebase.getCurrentEmail()}</Text>
                </View>
            </View>
            <ScrollView style={{ paddingHorizontal: 15 }}>
                <Text style={styles.title}>Statistics</Text>
                {/* <View style={styles.statistics}>
                    <StatisticsCard type="Active medicines" value={divided.active.length} />
                    <StatisticsCard type="Inactive medicines" value={divided.inactive.length} />
                </View> */}
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
            </ScrollView>
            {/* <TextInput
                placeholder="New password"
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
                // secureTextEntry
                style={{ borderColor: 'black', borderWidth: 1, padding: 5 }}
            />
            <Button onPress={() => changePassword()} title='Change password' />
            <TextInput
                placeholder="New username"
                value={newUserName}
                onChangeText={text => setNewUserName(text)}
                style={{ borderColor: 'black', borderWidth: 1, padding: 5 }}
            />
            <Button onPress={() => changeUsername()} title='Change username' />
            <Button onPress={() => logout()} title='Logout' /> */}
        </SafeAreaView>
    )
}

export default Profile;