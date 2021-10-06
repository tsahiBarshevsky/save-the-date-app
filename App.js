import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import { createStore } from 'redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Registration from './src/components/Registration/Registration';
import RootTabNavigator from './src/components';

const store = createStore(rootReducer);
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="TabNavigator"
                        component={RootTabNavigator}
                        options={{ headerShown: false }}
                    />
                    {/* <Stack.Screen name="Registration" component={Registration} /> */}
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
