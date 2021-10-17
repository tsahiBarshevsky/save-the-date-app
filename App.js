import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import { createStore } from 'redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import MainScreen from './src/components/MainScreen';
import RootTabNavigator from './src/components';
import ResetPassword from './src/components/ResetPassword/ResetPassword';
import LoginScreen from './src/components/LoginScreen/LoginScreen';
import RegistrationScreen from './src/components/RegistrationScreen/RegistrationScreen';
import SplashScreen from './src/components/SplashScreen';

const store = createStore(rootReducer);
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LoginScreen">
                    <Stack.Screen
                        name="TabNavigator"
                        component={RootTabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegistrationScreen"
                        component={RegistrationScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ResetPassword"
                        component={ResetPassword}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
