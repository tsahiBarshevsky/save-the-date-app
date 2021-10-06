import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen/HomeScreen';
import InsertionScreen from './InsertionScreen/InsertionScreen';

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home" backBehavior="initialRoute">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Insertion" component={InsertionScreen} />
        </Tab.Navigator>
    );
}

export default RootTabNavigator;
