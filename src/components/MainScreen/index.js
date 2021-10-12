import React, { useEffect, useRef } from 'react';
import { Alert, View, StyleSheet, ScrollView, Animated, Dimensions, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import firebase from '../../../firebase';
import FormHeader from './FormHeader';
import FormSelectorButton from './FormSelectorButton';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { background } from '../../../colors';

const { width } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {

    const background = { uri: 'https://images.pexels.com/photos/5498340/pexels-photo-5498340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' };
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
        outputRange: ['rgba(13, 92, 70,1)', 'rgba(13, 92, 70,0.4)']
    });
    const signupColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(13, 92, 70,0.4)', 'rgba(13, 92, 70,1)']
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
        <ImageBackground imageStyle={{ opacity: 0.2 }} blurRadius={1} source={background} style={styles.container} resizeMode='cover'>
            <View style={{ height: 80 }}>
                <FormHeader
                    leftHeading="Welcome "
                    rightHeading="Back "
                    subheading="To Save The Date!"
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
                <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    <LoginForm onLogin={onLogin} />
                </ScrollView>
                <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    <SignupForm onRegister={onRegister} />
                </ScrollView>
            </ScrollView>
        </ImageBackground>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    borderLeft: {
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    },
    borderRight: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    }
});
