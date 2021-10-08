import React, { useState } from 'react'
import { View, Button, Text, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { addNewItem } from '../../actions';
import { useDispatch } from 'react-redux';
import firebase from '../../../firebase';

const InsertionScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [usageTime, setUsageTime] = useState(1);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }

    const onAddNewMedicine = () => {
        let newMedicine = {
            openDate: date.setHours(0, 0, 0, 0),
            usageTime: usageTime,
            owner: firebase.getCurrentEmail(),
            name: name
        }
        fetch(`http://10.0.0.7:5000/add-new-medicine`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMedicine)
            })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
                // Add values returned from the API call
                newMedicine["endDate"] = res.endDate;
                newMedicine["_id"] = res.medicine_id;
                newMedicine["active"] = res.active;
                // Update store
                dispatch(addNewItem(newMedicine));
                setName('');
                setUsageTime(1);
                setDate(new Date());
                navigation.navigate("Home");
            })
            .catch(error => console.log(error.message));
    }

    return (
        <View>
            <TextInput
                placeholder="Name..."
                style={{ marginVertical: 10 }}
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                placeholder="Usage time..."
                style={{ marginVertical: 10 }}
                keyboardType="number-pad"
                value={usageTime.toString()}
                onChangeText={number => setUsageTime(number)}
            />
            <Button onPress={() => setShow(true)} title="Show date picker!" />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    onChange={onChangeDate}
                />
            )}
            <Text>{Moment(date).format('DD/MM/YYYY')}</Text>
            <Button onPress={() => onAddNewMedicine()} title="Add!" />
        </View>
    )
}

export default InsertionScreen;
