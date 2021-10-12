import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
// import { Shadow } from 'react-native-shadow-2';
import firebase from '../../../firebase';
import { styles } from './HomeScreenStyles';
import MedicineCard from '../MedicineCard/MedicineCard';
import { primary } from '../../../colors';

const HomeScreen = () => {

    const medicines = useSelector(state => state.medicines);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://10.0.0.5:5000/get-all-medicines?email=${firebase.getCurrentEmail()}`)
            .then(res => res.json())
            .then(medicines => dispatch({ type: 'SET_MEDICINES', medicines: medicines }))
            .catch(error => console.log(error.message));
        // console.log(Moment(Auth.auth().currentUser.metadata.creationTime).format('DD/MM/YYYY HH:mm'));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' backgroundColor={primary} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 21 }}
            >
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
                            <Text style={styles.statCount}>2</Text>
                            <Text style={styles.statLabel}>Active</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statCount}>5</Text>
                            <Text style={styles.statLabel}>Inactive</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statCount}>{medicines.length}</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>
                    </View>
                </View>
                {medicines.map((medicine, index) => {
                    return (
                        <MedicineCard
                            medicine={medicine}
                            index={index}
                            key={medicine._id}
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;
