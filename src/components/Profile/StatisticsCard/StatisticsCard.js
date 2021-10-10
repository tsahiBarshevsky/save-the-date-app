import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { primary, secondary } from '../../../../colors';

const StatisticsCard = ({ type, value }) => {

    const renderIcon = () => {
        switch (type) {
            case 'Active medicines':
                return <Entypo name="check" size={24} color="white" />;
            case 'Inactive medicines':
                return <Entypo name="cross" size={28} color="white" />
            default:
                return null;
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.icon, type === 'Active medicines' ? styles.active : styles.inactive]}>
                {renderIcon()}
            </View>
            <View style={styles.texts}>
                <Text style={styles.value}>{value}</Text>
                <Text>{type}</Text>
            </View>
        </View>
    )
}

export default StatisticsCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: 150,
        height: 150,
        padding: 10,
        position: 'relative'
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        borderRadius: 17.5
    },
    active: {
        backgroundColor: primary
    },
    inactive: {
        backgroundColor: '#F1573B'
    },
    texts: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 10,
        marginLeft: 10
    },
    value: {
        fontSize: 25,
        fontWeight: '600'
    }
});
