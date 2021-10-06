import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import firebase from '../../../firebase';

const HomeScreen = ({ navigation }) => {

    const medicines = useSelector(state => state.medicines);
    const dispatch = useDispatch();

    const logout = async () => {
        await firebase.logout();
        navigation.replace('Registration');
    }

    const calculateDaysLeft = (start, end) => {
        const today = new Date().setHours(0, 0, 0, 0);
        if (start > today)
            return "Hasn't opened";
        const diffTime = end.diff(start, 'days');
        // const result = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffTime > 0)
            return diffTime;
        return "Ended";
    }

    useEffect(() => {
        fetch(`http://10.0.0.7:5000/get-all-medicines?email=${firebase.getCurrentEmail()}`)
            .then(res => res.json())
            .then(medicines => dispatch({ type: 'SET_MEDICINES', medicines: medicines }))
            .catch(error => console.log(error.message));
    }, []);

    return (
        <View>
            <Text>Hey {firebase.getCurrentUsername()}, you have {medicines.length} medicines</Text>
            <Button title='Logout' onPress={() => logout()} />
            {medicines.map((medicine, index) => {
                return (
                    <View key={index} style={{ marginVertical: 5, backgroundColor: 'lightskyblue' }}>
                        <Text>{`${medicine.name}:`}</Text>
                        <Text>{medicine.owner}</Text>
                        <Text>{`${Moment(medicine.openDate).format('DD/MM/YYYY')} -> ${Moment(medicine.endDate).format('DD/MM/YYYY')}`}</Text>
                        <Text>Usage time: {medicine.usageTime}</Text>
                        <Text>Days left: {calculateDaysLeft(Moment(medicine.openDate), Moment(medicine.endDate))}</Text>
                        <Text>{medicine.active ? 'active' : 'not active'}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default HomeScreen;
