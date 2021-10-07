import React, { useState, useEffect } from 'react';
import { Alert, Button, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
// import { auth } from '../../../firebase';

import firebase from '../../../firebase';

const Registration = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user)
                navigation.replace("TabNavigator");
        });
        return unsubscribe;
    }, []);


    const onRegister = async () => {
        try {
            await firebase.register(name.trim(), email.trim(), password);
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
                placeholder="Username"
                value={name}
                onChangeText={text => setName(text)}
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
            <Button title="Create account" onPress={() => onRegister()} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            {/* <Button title='Go to home' onPress={() => navigation.navigate("TabNavigator")} /> */}
        </View>
    )
}

export default Registration;
