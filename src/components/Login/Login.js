import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, View, TextInput, Alert } from 'react-native'
import firebase from '../../../firebase';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user)
                navigation.replace("TabNavigator")
        });
        return unsubscribe;
    }, []);

    const onLogin = async () => {
        try {
            await firebase.login(email, password);
            Alert.alert('Success!!!');
        }
        catch (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Email Address"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                style={{ borderColor: 'black', borderWidth: 1, padding: 5 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={!showPassword ? true : false}
                style={{ borderColor: 'black', borderWidth: 1, padding: 5 }}
            />
            <Button onPress={() => setShowPassword(!showPassword)} title="Show password" />
            <Button title="Login" onPress={() => onLogin()} />
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({})
