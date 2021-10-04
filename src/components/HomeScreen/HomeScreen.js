import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
// import { addNewItem, removeItem } from '../../actions';

const HomeScreen = ({ navigation }) => {

    const medicines = useSelector(state => state.medicines);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://${process.env.LOCAL_IP}:5000/get-all-medicines?email=tsahi.13@gmail.com`)
            .then(res => res.json())
            .then(medicines => dispatch({ type: 'SET_MEDICINES', medicines: medicines }))
            .catch(error => console.log(error.message));
    }, []);

    return (
        <View>
            <Button onPress={() => navigation.navigate('Insertion')} title='Add new medicine' />
            {medicines.map((medicine, index) => {
                return (
                    <View key={index} style={{ marginVertical: 5, backgroundColor: 'lightskyblue' }}>
                        <Text>{`${medicine.name}:`}</Text>
                        <Text>{medicine._id}</Text>
                        <Text>{`${Moment(medicine.openDate).format('DD/MM/YYYY')} -> ${Moment(medicine.endDate).format('DD/MM/YYYY')}`}</Text>
                        <Text>{medicine.usageTime}</Text>
                        <Text>{medicine.active ? 'active' : 'not active'}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default HomeScreen;
