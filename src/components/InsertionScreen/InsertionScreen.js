import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';
import { addNewItem } from '../../actions';
import { useDispatch } from 'react-redux';
import firebase from '../../../firebase';
import { styles } from './InsertionScreenStyles';
import Toast from 'react-native-toast-message';

const InsertionScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [usageTime, setUsageTime] = useState(null);
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
        if (name === '' || (usageTime <= 0 || usageTime === null)) {
            switch (true) {
                case (name === '' && (usageTime === '' || usageTime === null)):
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please provide medicine name and usage time.',
                        position: 'bottom'
                    });
                    break;
                case (name === '' && usageTime > 0):
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please provide medicine name.',
                        position: 'bottom'
                    });
                    break;
                case (usageTime === '' || usageTime === null):
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please provide medicine usage time.',
                        position: 'bottom'
                    });
                    break;
                case (name !== '' && usageTime <= 0):
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please provide a positive usage time.',
                        position: 'bottom'
                    });
                    break;
                case (name === '' && usageTime <= 0):
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please provide medicine name and a positive usage time.',
                        position: 'bottom'
                    });
                    break;
                default:
                    return null;
            }
        }
        else {
            let newMedicine = {
                openDate: date.setHours(0, 0, 0, 0),
                usageTime: usageTime,
                owner: firebase.getCurrentEmail(),
                name: name
            }
            fetch(`https://save-the-date-backend.herokuapp.com/add-new-medicine`,
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
                    Toast.show({
                        type: 'success',
                        text1: 'Great!',
                        text2: res.message,
                        position: 'bottom'
                    });
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
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
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
                                placeholder="Enter usage time in months..."
                                keyboardType="number-pad"
                                value={usageTime ? usageTime.toString() : ''}
                                onChangeText={number => setUsageTime(number)}
                                ref={usageTimeRef}
                                style={styles.input}
                            />
                        </View>
                        <Text style={styles.label}>Opening date</Text>
                        <TouchableOpacity
                            style={styles.textInputWrapper}
                            activeOpacity={1}
                            onPress={() => setShow(true)}
                        >
                            <View style={styles.iconWrapper}>
                                <AntDesign name="calendar" size={18} color="white" />
                            </View>
                            <Text style={{ marginLeft: 15 }}>
                                {Moment(date).format('DD/MM/YYYY')}
                            </Text>
                        </TouchableOpacity>
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
                            onPress={() => onAddNewMedicine()}
                        >
                            <Text style={{ color: 'white' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default InsertionScreen;
