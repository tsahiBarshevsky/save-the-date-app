import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './LoginScreenStyles';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const image = require('../../../assets/authentication.png');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={{ width: '100%', height: '100%', flex: 1 }} source={image} resizeMode='contain' />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollview}
            >
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.formContainer}
                >
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
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default LoginScreen;
