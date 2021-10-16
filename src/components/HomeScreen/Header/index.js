import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as firebaseAuth from 'firebase';
import firebase from '../../../../firebase';
import { primary } from '../../../../colors';

const Header = ({ username, active, inactive, total }) => {

    const user = firebaseAuth.auth().currentUser;
    // console.log(user)
    const avatar = require('../../../../assets/avatar.png');

    return (
        <View style={styles.header}>
            <View style={styles.info}>
                <FontAwesome name="arrow-left" size={30} color="white" style={styles.icon} />
                <Text style={styles.username}>
                    {user.displayName ? `${user.displayName} (origin)` : `${username} (route)`}
                </Text>
            </View>
            <View style={styles.imageAndStats}>
                <Image source={user.photoURL ? { uri: user.photoURL } : avatar} style={styles.image} />
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
        marginBottom: 25
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
    imageAndStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: 180
    },
    stat: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    statCount: {
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: -5
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 14
    }
});
