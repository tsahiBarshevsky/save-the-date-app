import React, { useState } from 'react';
import { StyleSheet, ImageBackground, StatusBar, TextInput, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import firebase from '../../../firebase';
import { background, primary } from '../../../colors';

const ResetPassword = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const background = { uri: 'https://images.pexels.com/photos/5498340/pexels-photo-5498340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' };

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
        <ImageBackground
            imageStyle={{ opacity: 0.2 }}
            blurRadius={1}
            source={background}
            style={styles.container}
            resizeMode='cover'
        >
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back-sharp" size={24} color="#1b1b33" />
                </TouchableOpacity>
                <Text style={styles.title}>Reset your password</Text>
            </View>
            <View style={styles.form}>
                <Text style={{ marginBottom: 20 }}>
                    Enter the email you've been registered with to recive a password reset email
                </Text>
                <View style={styles.textInputWrapper}>
                    <View style={styles.iconWrapper}>
                        <MaterialIcons name="email" size={15} color="white" />
                    </View>
                    <TextInput
                        placeholder="example@email.com"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.submit}
                    onPress={() => onResetPassword()}
                >
                    <Text style={styles.label}>Send a reset email</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 15
    },
    button: {
        marginRight: 10
    },
    title: {
        color: '#1b1b33',
        fontSize: 18,
        transform: [{ translateY: -2 }]
    },
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginHorizontal: 20
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
    submit: {
        height: 38,
        width: '100%',
        backgroundColor: primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    label: {
        color: 'white',
        fontSize: 16
    }
});
