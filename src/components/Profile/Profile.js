import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import firebase from '../../../firebase';

const Profile = ({ navigation }) => {

    const [newPassword, setNewPassword] = useState('');
    const [newUserName, setNewUserName] = useState('');

    const changePassword = async () => {
        try {
            await firebase.changePassword(newPassword);
            setNewPassword('');
            Alert.alert('Password changed');
        }
        catch (error) {
            Alert.alert(error.message);
        }
    }

    const changeUsername = async () => {
        try {
            await firebase.changeUsername(newUserName);
            setNewUserName('');
            Alert.alert('Username changed. You will see the change in your next login');
        }
        catch (error) {
            Alert.alert(error.message);
        }
    }

    const logout = () => {
        firebase.logout();
        navigation.replace("Login");
    }

    return (
        <View>
            <TextInput
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
            <Button onPress={() => logout()} title='Logout' />
        </View>
    )
}

export default Profile;