import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addNewItem, removeItem } from '../../actions';

const HomeScreen = () => {

    const medicines = useSelector(state => state.medicines);
    const dispatch = useDispatch();

    useEffect(() => {
        // fetch('http://localhost:5000/get-all-medicines?email=tsahi.13@gmail.com')
        //   .then(res => res.json())
        //   .then(tasks => dispatch({ type: 'SET_TASKS', items: tasks }));
        dispatch({ type: 'SET_MEDICINES', medicines: [1, 2] });
    }, []);

    return (
        <View>
            <Text>This is home!</Text>
            <Button onPress={() => dispatch(addNewItem(3))} title='add' />
            <Button onPress={() => dispatch(removeItem(1))} title='remove' />
            {medicines.map((medicine, index) => {
                return (
                    <View key={index}>
                        <Text>{medicine}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default HomeScreen;
