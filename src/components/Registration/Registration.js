import React, { useState, useEffect, useRef } from 'react';
import { Alert, View, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
// import { auth } from '../../../firebase';

import firebase from '../../../firebase';
import FormHeader from './FormHeader';
import FormSelectorButton from './FormSelectorButton';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const { width } = Dimensions.get('window');

const Registration = ({ navigation }) => {

    const scrollView = useRef();
    const animation = useRef(new Animated.Value(0)).current;
    const rightHeaderOpacity = animation.interpolate({
        inputRange: [0, width],
        outputRange: [1, 0]
    });
    const leftHeaderTranslateX = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, 40]
    });
    const rightHedaerTranslateY = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, -20]
    });
    const loginColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27,27,51,1)', 'rgba(27,27,51,0.4)']
    });
    const signupColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27,27,51,0.4)', 'rgba(27,27,51,1)']
    });

    // const [email, setEmail] = useState('');
    // const [name, setName] = useState('');
    // const [password, setPassword] = useState('');
    // const [showPassword, setShowPassword] = useState(false);

    // useEffect(() => {
    //     const unsubscribe = firebase.auth.onAuthStateChanged(user => {
    //         if (user)
    //             navigation.replace("TabNavigator");
    //     });
    //     return unsubscribe;
    // }, []);


    // const onRegister = async () => {
    //     try {
    //         await firebase.register(name.trim(), email.trim(), password);
    //         Alert.alert('Success!!!');
    //     }
    //     catch (error) {
    //         Alert.alert(error.message);
    //     }
    // }

    return (
        <View style={{ flex: 1, paddingTop: 80 }}>
            <View style={{ height: 80 }}>
                <FormHeader
                    leftHeading="Welcome "
                    rightHeading="Back"
                    subheading="Save The Date"
                    rightHeaderOpacity={rightHeaderOpacity}
                    leftHeaderTranslateX={leftHeaderTranslateX}
                    rightHedaerTranslateY={rightHedaerTranslateY}
                />
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                <FormSelectorButton
                    style={styles.borderLeft}
                    backgroundColor={loginColorInterpolate}
                    title='Login'
                    onPress={() => scrollView.current.scrollTo({ x: 0 })}
                />
                <FormSelectorButton
                    style={styles.borderRight}
                    backgroundColor={signupColorInterpolate}
                    title='Sign up'
                    onPress={() => scrollView.current.scrollTo({ x: width })}
                />
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={scrollView}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: animation } } },
                ], { useNativeDriver: false })}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <LoginForm />
                </ScrollView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SignupForm />
                </ScrollView>
            </ScrollView>
        </View>
    )
}

export default Registration;

const styles = StyleSheet.create({
    borderLeft: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    borderRight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
});


// <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     <TextInput
        //         placeholder="Email Address"
        //         value={email}
        //         onChangeText={text => setEmail(text)}
        //         keyboardType="email-address"
        //         style={{ borderColor: 'black', borderWidth: 1, padding: 5 }}
        //     />
        //     <TextInput
        //         placeholder="Username"
        //         value={name}
        //         onChangeText={text => setName(text)}
        //         style={{ borderColor: 'black', borderWidth: 1, padding: 5 }}
        //     />
        //     <TextInput
        //         placeholder="Password"
        //         value={password}
        //         onChangeText={text => setPassword(text)}
        //         secureTextEntry={!showPassword ? true : false}
        //         style={{ borderColor: 'black', borderWidth: 1, padding: 5 }}
        //     />
        //     <Button onPress={() => setShowPassword(!showPassword)} title="Show password" />
        //     <Button title="Create account" onPress={() => onRegister()} />
        //     <Button title="Login" onPress={() => navigation.navigate('Login')} />
        // </View>