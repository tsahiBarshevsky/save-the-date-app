import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Image, StyleSheet, StatusBar, TextInput, Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../../../firebase';
import { background, primary } from '../../../colors';

const ResetPassword = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const image = require('../../../assets/resetPassword.png');

    const onResetPassword = async () => {
        try {
            var reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (reg.test(email.trim())) {
                await firebase.resetPassword(email.trim());
                Alert.alert("A password reset was sent to your email; Check your inbox.");
                setTimeout(() => {
                    navigation.goBack();
                }, 5000);
            }
            else
                Alert.alert('Please enter a valid email address');
        }
        catch (error) {
            Alert.alert(error.message);
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
                        <Text style={styles.title}>Forgot password</Text>
                        <Text style={styles.label}>Your email</Text>
                        <View style={styles.textInputWrapper}>
                            <View style={styles.iconWrapper}>
                                <MaterialIcons name="email" size={15} color="white" />
                            </View>
                            <TextInput
                                placeholder="example@email.com"
                                value={email}
                                onChangeText={text => setEmail(text)}
                                keyboardType='email-address'
                                style={styles.input}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.submit}
                            activeOpacity={0.8}
                            onPress={() => onResetPassword()}
                        >
                            <Text style={styles.submitLabel}>Send Password Reset</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        paddingVertical: 10,
        height: 200,
        width: '100%',
        backgroundColor: primary
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    scrollview: {
        backgroundColor: primary,
        height: '100%',
        flexGrow: 1
    },
    form: {
        backgroundColor: background,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: Dimensions.get('window').height - 200
    },
    title: {
        color: '#223943',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 40
    },
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
        alignSelf: 'flex-end',
        marginTop: -10
    },
    submit: {
        width: '100%',
        height: 38,
        backgroundColor: primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5
    },
    submitLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2
    },
    signUp: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    link: {
        color: primary,
        fontWeight: 'bold'
    }
});
