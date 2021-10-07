import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import firebase from '../../../firebase';
import MedicineCard from '../MedicineCard/MedicineCard';

const HomeScreen = ({ navigation }) => {

    const medicines = useSelector(state => state.medicines);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://10.0.0.7:5000/get-all-medicines?email=${firebase.getCurrentEmail()}`)
            .then(res => res.json())
            .then(medicines => dispatch({ type: 'SET_MEDICINES', medicines: medicines }))
            .catch(error => console.log(error.message));
    }, []);

    return (
        <View>
            <Text>Hey {firebase.getCurrentUsername()}, you have {medicines.length} medicines</Text>
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
        </View>
    )
}

export default HomeScreen;
