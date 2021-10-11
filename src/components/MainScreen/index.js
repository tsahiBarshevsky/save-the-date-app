import React, { useEffect, useRef } from 'react';
import { Alert, View, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import firebase from '../../../firebase';
import FormHeader from './FormHeader';
import FormSelectorButton from './FormSelectorButton';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const { width } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {

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

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user)
                navigation.replace("TabNavigator");
        });
        return unsubscribe;
    }, []);


    const onRegister = (email, username, password) => {
        firebase.register(username.trim(), email.trim(), password);
    }

    const onLogin = async (email, password) => {
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
        <View style={{ flex: 1, paddingTop: 80, backgroundColor: '#f5f5f5' }}>
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
                    <LoginForm onLogin={onLogin} />
                </ScrollView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SignupForm onRegister={onRegister} />
                </ScrollView>
            </ScrollView>
        </View>
    )
}

export default MainScreen;

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
