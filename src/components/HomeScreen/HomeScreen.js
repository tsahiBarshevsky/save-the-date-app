import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../../firebase';
import { styles } from './HomeScreenStyles';
import MedicineCard from '../MedicineCard/MedicineCard';
import { primary } from '../../../colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {

    const medicines = useSelector(state => state.medicines);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://10.0.0.8:5000/get-all-medicines?email=${firebase.getCurrentEmail()}`)
            .then(res => res.json())
            .then(medicines => dispatch({ type: 'SET_MEDICINES', medicines: medicines }))
            .catch(error => console.log(error.message));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' backgroundColor={primary} />
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.letter}>
                        {firebase.getCurrentUsername().charAt(0).toUpperCase()}
                    </Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.text}>
                        Hey {firebase.getCurrentUsername()}!
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Text style={styles.text}>Go To Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
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
