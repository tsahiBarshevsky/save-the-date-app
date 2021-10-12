import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../../../../firebase';
import { primary } from '../../../../colors';

const Header = ({ active, inactive, total }) => {
    return (
        <View style={styles.header}>
            <View style={styles.info}>
                <FontAwesome name="arrow-left" size={30} color="white" style={styles.icon} />
                <Text style={styles.username}>
                    {firebase.getCurrentUsername() && firebase.getCurrentUsername()}
                </Text>
            </View>
            <Text style={styles.title}>Your medicines</Text>
            <View style={styles.stats}>
                <View style={styles.stat}>
                    <Text style={styles.statCount}>{active}</Text>
                    <Text style={styles.statLabel}>Active</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statCount}>{inactive}</Text>
                    <Text style={styles.statLabel}>Inactive</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statCount}>{total}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        backgroundColor: primary,
        paddingTop: 15,
        paddingBottom: 20,
        paddingHorizontal: 35,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: 15
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15
    },
    icon: {
        transform: [{ rotate: '45deg' }],
        marginRight: 15
    },
    username: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    stat: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    statCount: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: -5
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 14
    }
});
