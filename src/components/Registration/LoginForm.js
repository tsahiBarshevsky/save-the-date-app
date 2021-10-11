import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import FormContainer from './FormContainer';
import FormSubmitButton from './FormSubmitButton';

const LoginForm = () => {
    return (
        <FormContainer>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Email</Text>
            <TextInput
                placeholder="example@email.com"
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
                style={{
                    borderWidth: 1,
                    borderColor: '#1b1b33',
                    height: 35,
                    borderRadius: 10,
                    fontSize: 16,
                    paddingLeft: 10
                }}
            />
            <FormSubmitButton title='Login' />
        </FormContainer>
    )
}

export default LoginForm;

const styles = StyleSheet.create({

});
