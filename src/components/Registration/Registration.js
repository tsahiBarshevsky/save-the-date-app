import React from 'react';
import { Button, View } from 'react-native';

const Registration = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title='Go to home' onPress={() => navigation.navigate("TabNavigator")} />
        </View>
    )
}

export default Registration;
