import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import FormContainer from './FormContainer';
import FormSubmitButton from './FormSubmitButton';
import { primary } from '../../../colors';

import { useNavigation } from '@react-navigation/native';

const LoginForm = ({ onLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const passwordRef = useRef();

    return (
        <FormContainer>
            <Text style={styles.label}>Email</Text>
            <View style={styles.textInputWrapper}>
                <View style={styles.iconWrapper}>
                    <MaterialIcons name="email" size={15} color="white" />
                </View>
                <TextInput
                    placeholder="example@email.com"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType='email-address'
                    returnKeyType='next'
                    onSubmitEditing={() => passwordRef.current.focus()}
                    style={styles.input}
                />
            </View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.textInputWrapper}>
                <View style={styles.iconWrapper}>
                    <Entypo name="lock-open" size={15} color="white" />
                </View>
                <TextInput
                    placeholder="••••••••••••"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    ref={passwordRef}
                    style={styles.input}
                    secureTextEntry={!showPassword ? true : false}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ marginRight: 5 }}
                >
                    {!showPassword ?
                        <Entypo name="eye" size={22} color="gray" />
                        :
                        <Entypo name="eye-with-line" size={22} color="gray" />
                    }
                </TouchableOpacity>
            </View>
            <FormSubmitButton title='Login' onPress={() => onLogin(email, password)} />
            <View style={styles.resetPassword}>
                <Text style={styles.text}>Forgot your password? </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ResetPassword')}
                >
                    <Text style={[styles.text, styles.link]}>Reset it</Text>
                </TouchableOpacity>
            </View>
        </FormContainer>
    )
}

export default LoginForm;

const styles = StyleSheet.create({
    label: {
        color: 'black',
        letterSpacing: 1,
        marginBottom: 5,
        textTransform: 'uppercase'
    },
    textInputWrapper: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#bdbdbd',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        marginBottom: 15
    },
    iconWrapper: {
        backgroundColor: primary,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    input: {
        flex: 1,
        marginHorizontal: 15
    },
    resetPassword: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    text: {
        color: '#1b1b33'
    },
    link: {
        textDecorationLine: 'underline'
    }
});
