import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Moment from 'moment';
import firebase from '../../../firebase';
import { primary } from '../../../colors';
import { addNewItem } from '../../actions';

const SplashScreen = ({ navigation }) => {

    const medicines = useSelector(state => state.medicines);
    //console.log(medicines.length)
    // const divided = medicines.reduce((array, item) => {
    //     array[item.active ? 'active' : 'inactive'].push(item);
    //     return array;
    // }, { active: [], inactive: [] });
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://10.0.0.3:5000/get-all-medicines?email=${firebase.getCurrentEmail()}`)
            .then(res => res.json())
            .then(medicines => {
                const today = Moment(new Date().setHours(0, 0, 0, 0));
                medicines.forEach((medicine) => {
                    var status = true;
                    if (Moment(medicine.endDate).isSame(today) && medicine.active) {
                        console.log('enter if');
                        status = false;
                        fetch(`http://10.0.0.3:5000/change-active-status?id=${medicine._id}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ active: status })
                            })
                            .then(res => res.json())
                            .then(res => console.log(res))
                            .catch(error => console.log(error.message));
                        var duplicate = medicine;
                        duplicate["active"] = status;
                        dispatch(addNewItem(duplicate));
                    }
                    else
                        dispatch(addNewItem(medicine));
                })
            })
            .catch(error => console.log(error.message))
            .finally(() => {
                navigation.replace("TabNavigator");
            });

        // Get reminder value from async storage
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('reminder');
                if (value !== null)
                    dispatch({ type: 'SET_DAYS_LEFT', daysLeft: value });
            }
            catch (e) {
                console.log(e.message);
            }
        }
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style='light' backgroundColor={primary} />
            <View style={styles.splash}>
                <Text style={{ color: 'white', fontSize: 40 }}>Loading</Text>
            </View>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    splash: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});
