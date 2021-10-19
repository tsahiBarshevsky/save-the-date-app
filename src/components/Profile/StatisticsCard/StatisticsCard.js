import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { black, blackText, green, greenText, primary, red, redText } from '../../../../colors';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';

const StatisticsCard = ({ type, value }) => {

    const isSmall = useMediaQuery({ query: '(min-width: 400px)' });

    const renderIcon = () => {
        switch (type) {
            case 'Total medicines':
                return (
                    <View style={[styles.icon, { backgroundColor: '#c2effc' }]}>
                        <FontAwesome5 name="briefcase-medical" size={17} color="#00485d" />
                    </View>
                );
            case 'Active':
                return (
                    <View style={[styles.icon, { backgroundColor: green }]}>
                        <Entypo name="check" size={24} color={greenText} />
                    </View>
                );
            case 'Close to end':
                return (
                    <View style={[styles.icon, { backgroundColor: red }]}>
                        <MaterialCommunityIcons name="timer-sand-empty" size={24} color={redText} />
                    </View>
                );
            case 'Inactive':
                return (
                    <View style={[styles.icon, { backgroundColor: black }]}>
                        <Entypo name="cross" size={28} color={blackText} />
                    </View>
                );
            default:
                return null;
        }
    }

    return (
        <View style={[styles.container, isSmall ? { width: 175 } : { width: 150 }]}>
            {renderIcon()}
            <View style={styles.texts}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.type}>{type}</Text>
            </View>
        </View>
    )
}

export default StatisticsCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: 15,
        //width: 150,
        height: 150,
        padding: 10,
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        borderRadius: 17.5
    },
    texts: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 10,
        marginLeft: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    type: {
        color: 'rgba(0,0,0,0.6)'
    },
    value: {
        fontSize: 25,
        fontWeight: 'bold',
    }
});
