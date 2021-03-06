import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen/HomeScreen';
import InsertionScreen from './InsertionScreen/InsertionScreen';
import Logout from './Logout/Logout';
import CalendarScreen from './CalendarScreen/CalendarScreen';
import Profile from './Profile/Profile';
import { primary, background } from '../../colors';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <View
            style={{
                width: 55,
                height: 55,
                borderRadius: 27.5,
                backgroundColor: primary,
                borderWidth: 4,
                borderColor: background
            }}
        >
            {children}
        </View>
    </TouchableOpacity>
)

const RootTabNavigator = ({ route }) => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior="initialRoute"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'relative',
                    elevation: 0,
                    backgroundColor: primary,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    height: 52
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                initialParams={route.params !== undefined ? { username: username } : null}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Entypo name="home" size={24} color={focused ? "white" : "#ffffff99"} />
                            <Text style={[focused ? { color: 'white' } : { color: '#ffffff99' }, { fontSize: 10 }]}>Home</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome
                                name="calendar"
                                size={20}
                                color={focused ? "white" : "#ffffff99"}
                                style={{
                                    marginBottom: 5,
                                    transform: [{ translateY: 2 }]
                                }}
                            />
                            <Text style={[focused ? { color: 'white' } : { color: '#ffffff99' }, { fontSize: 10 }]}>Calendar</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Insertion"
                component={InsertionScreen}
                options={{
                    headerShown: false,
                    // tabBarHideOnKeyboard: true,
                    tabBarIcon: () => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="add" size={35} color="white"
                                style={{ transform: [{ translateX: 1 }] }}
                            />
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome name="user-circle-o" size={24} color={focused ? "white" : "#ffffff99"} />
                            <Text style={[focused ? { color: 'white' } : { color: '#ffffff99' }, { fontSize: 10 }]}>Account</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Logout"
                component={Logout}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="logout" size={24} color={focused ? "white" : "#ffffff99"} />
                            <Text style={[focused ? { color: 'white' } : { color: '#ffffff99' }, { fontSize: 10 }]}>Logout</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default RootTabNavigator;
