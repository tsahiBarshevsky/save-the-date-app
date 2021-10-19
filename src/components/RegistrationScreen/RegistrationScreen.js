import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import firebase from '../../../firebase';
import { styles } from './RegistrationScreenStyles';
import Toast from 'react-native-toast-message';

const RegistrationScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const image = require('../../../assets/authentication.png');

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("SplashScreen", { name: 'Name for check' });
            }
        });
        return unsubscribe;
    }, []);

    const onRegister = () => {
        if (username.trim() !== '')
            firebase.register(username.trim(), email.trim(), password);
        else
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "The username remained empty, please provide it.",
                position: 'bottom'
            })
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollview}
            >
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <View style={styles.header}>
                        <Image style={styles.image} source={image} resizeMode='contain' />
                    </View>
                    <View style={styles.form}>
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
                                maxLength={10}
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
                        <TouchableOpacity
                            style={styles.submit}
                            activeOpacity={0.8}
                            onPress={() => onRegister()}
                        >
                            <Text style={styles.submitLabel}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={styles.signIn}>
                            <Text style={{ color: '#223943' }}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={styles.link}> Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default RegistrationScreen;
