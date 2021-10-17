import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import firebase from '../../../firebase';
import { styles } from './LoginScreenStyles';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef();
    const image = require('../../../assets/authentication.png');

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("TabNavigator");
            }
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
            console.log(error.message);
        }
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
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.resetPassword}
                            onPress={() => navigation.navigate('ResetPassword')}
                        >
                            <Text style={{ color: '#223943', fontSize: 12 }}>Forgot password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submit}
                            activeOpacity={0.8}
                            onPress={() => onLogin()}
                        >
                            <Text style={styles.submitLabel}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.signUp}>
                            <Text style={{ color: '#223943' }}>
                                Doesn't have an account?
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => navigation.navigate("RegistrationScreen")}
                            >
                                <Text style={styles.link}> Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default LoginScreen;