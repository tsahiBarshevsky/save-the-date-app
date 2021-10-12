import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import FormContainer from './FormContainer';
import FormSubmitButton from './FormSubmitButton';
import { primary } from '../../../colors';

const SignupForm = ({ onRegister }) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef();
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
                    returnKeyType='next'
                    onSubmitEditing={() => usernameRef.current.focus()}
                    style={styles.input}
                />
            </View>
            <Text style={styles.label}>Username</Text>
            <View style={styles.textInputWrapper}>
                <View style={styles.iconWrapper}>
                    <FontAwesome5 name="user-alt" size={15} color="white" />
                </View>
                <TextInput
                    placeholder="Limited to 10 characters"
                    value={username}
                    ref={usernameRef}
                    onChangeText={text => setUsername(text)}
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
                    placeholder="At least 6 characters"
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
            <FormSubmitButton title='Sign up' onPress={() => onRegister(email, username, password)} />
        </FormContainer>
    )
}

export default SignupForm;

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
    }
});
