import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen/HomeScreen';
import InsertionScreen from './InsertionScreen/InsertionScreen';
import Logout from './Logout/Logout';
import CalendarScreen from './CalendarScreen/CalendarScreen';

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home" backBehavior="initialRoute">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Insertion" component={InsertionScreen} />
            <Tab.Screen name="Logout" component={Logout} />
        </Tab.Navigator>
    );
}

export default RootTabNavigator;
