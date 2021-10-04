import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { addNewItem, removeItem } from '../../actions';

const HomeScreen = () => {

    const medicines = useSelector(state => state.medicines);
    const dispatch = useDispatch();

    // const [date, setDate] = useState(new Date());
    // const [show, setShow] = useState(false);

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    // };

    useEffect(() => {
        fetch(`http://${process.env.LOCAL_IP}:5000/get-all-medicines?email=tsahi.13@gmail.com`)
            .then(res => res.json())
            .then(medicines => dispatch({ type: 'SET_MEDICINES', medicines: medicines }))
            .catch(error => console.log(error.message));
    }, []);

    return (
        <View>
            {/* <View>
                <Button onPress={() => setShow(true)} title="Show date picker!" />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )} */}
            {medicines.map((medicine, index) => {
                return (
                    <View key={index}>
                        <Text>{`${medicine.name}: ${Moment(medicine.openDate).format('DD/MM/YYYY')} -> ${Moment(medicine.endDate).format('DD/MM/YYYY')}`}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default HomeScreen;
