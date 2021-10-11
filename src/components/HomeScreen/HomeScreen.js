import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { Shadow } from 'react-native-shadow-2';
import firebase from '../../../firebase';
import { styles } from './HomeScreenStyles';
import MedicineCard from '../MedicineCard/MedicineCard';
import { primary } from '../../../colors';

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
            <Shadow distance={5} startColor={'#0D5C4680'} finalColor={'#0D5C4603'} offset={[0, -20]}>
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
                            activeOpacity={1}
                            style={styles.button}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <Text style={styles.buttonText}>Go To Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Shadow>
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
