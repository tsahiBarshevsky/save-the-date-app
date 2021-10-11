import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import FormContainer from './FormContainer';
import FormSubmitButton from './FormSubmitButton';

const SignupForm = ({ onRegister }) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                    paddingLeft: 10,
                    marginBottom: 10
                }}
            />
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Username</Text>
            <TextInput
                placeholder="Up to 10 char..."
                value={username}
                onChangeText={text => setUsername(text)}
                style={{
                    borderWidth: 1,
                    borderColor: '#1b1b33',
                    height: 35,
                    borderRadius: 10,
                    fontSize: 16,
                    paddingLeft: 10,
                    marginBottom: 10
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
                    paddingLeft: 10,
                    marginBottom: 10
                }}
            />
            <FormSubmitButton title='Sign up' onPress={() => onRegister(email, username, password)} />
        </FormContainer>
    )
}

export default SignupForm;

const styles = StyleSheet.create({

});
