import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';
import { addNewItem } from '../../actions';
import { useDispatch } from 'react-redux';
import firebase from '../../../firebase';
import { styles } from './InsertionScreenStyles';

const DissmissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const InsertionScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [usageTime, setUsageTime] = useState(1);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const usageTimeRef = useRef();
    const dispatch = useDispatch();

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }

    const onAddNewMedicine = () => {
        // if (name === '' || usageTime >= 0)
        let newMedicine = {
            openDate: date.setHours(0, 0, 0, 0),
            usageTime: usageTime,
            owner: firebase.getCurrentEmail(),
            name: name
        }
        fetch(`http://10.0.0.8:5000/add-new-medicine`,
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
        <DissmissKeyboard>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add new medicine</Text>
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={styles.label}>Medicine name</Text>
                    <View style={styles.textInputWrapper}>
                        <View style={styles.iconWrapper}>
                            <FontAwesome5 name="hand-holding-medical" size={15} color="white" />
                        </View>
                        <TextInput
                            placeholder="Enter medicine name..."
                            value={name}
                            onChangeText={text => setName(text)}
                            returnKeyType='next'
                            onSubmitEditing={() => usageTimeRef.current.focus()}
                            style={styles.input}
                        />
                    </View>
                    <Text style={styles.label}>Usage time</Text>
                    <View style={styles.textInputWrapper}>
                        <View style={styles.iconWrapper}>
                            <Entypo name="stopwatch" size={18} color="white" />
                        </View>
                        <TextInput
                            placeholder="Enter usage time..."
                            keyboardType="number-pad"
                            value={usageTime.toString()}
                            onChangeText={number => setUsageTime(number)}
                            ref={usageTimeRef}
                            style={styles.input}
                        />
                    </View>
                    <Text style={styles.label}>Opening date</Text>
                    <View style={styles.textInputWrapper}>
                        <TouchableOpacity
                            activeOpacity={2}
                            style={styles.iconWrapper}
                            onPress={() => setShow(true)}
                        >
                            <AntDesign name="calendar" size={18} color="white" />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 15 }}>
                            {Moment(date).format("DD")} / {Moment(date).month() + 1} / {Moment(date).year()}
                        </Text>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            onChange={onChangeDate}
                        />
                    )}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.addButton}
                    >
                        <Text style={{ color: 'white' }}>Add</Text>
                    </TouchableOpacity>
                    {/* <Button onPress={() => onAddNewMedicine()} title="Add!" /> */}
                </View>
            </SafeAreaView>
        </DissmissKeyboard>
    )
}

export default InsertionScreen;
