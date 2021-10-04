import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen/HomeScreen';
import InsertionScreen from './InsertionScreen/InsertionScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Insertion" component={InsertionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;
