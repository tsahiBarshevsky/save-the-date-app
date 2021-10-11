import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Alert } from 'react-native';
import FormContainer from './FormContainer';
import FormSubmitButton from './FormSubmitButton';
import firebase from '../../../firebase';

const LoginForm = ({ onLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     const unsubscribe = firebase.auth.onAuthStateChanged(user => {
    //         if (user)
    //             navigation.replace("TabNavigator");
    //     });
    //     return unsubscribe;
    // }, []);

    // const onLogin = async () => {
    //     try {
    //         await firebase.login(email, password);
    //         Alert.alert('Success!!!');
    //     }
    //     catch (error) {
    //         Alert.alert(error.message);
    //     }
    // }

    return (
        <FormContainer>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Email</Text>
            <TextInput
                placeholder="example@email.com"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                style={{
                    borderWidth: 1,
                    borderColor: '#1b1b33',
                    height: 35,
                    borderRadius: 10,
                    fontSize: 16,
                    paddingLeft: 10
                }}
            />
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Password</Text>
            <TextInput
                placeholder="Password..."
                value={password}
                onChangeText={text => setPassword(text)}
                style={{
                    borderWidth: 1,
                    borderColor: '#1b1b33',
                    height: 35,
                    borderRadius: 10,
                    fontSize: 16,
                    paddingLeft: 10
                }}
            />
            <FormSubmitButton title='Login' onPress={() => onLogin(email, password)} />
        </FormContainer>
    )
}

export default LoginForm;

const styles = StyleSheet.create({

});
