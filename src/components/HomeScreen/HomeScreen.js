import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../../firebase';
import { styles } from './HomeScreenStyles';
import MedicineCard from '../MedicineCard/MedicineCard';
import { primary } from '../../../colors';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import { addNewItem } from '../../actions';

const HomeScreen = ({ route }) => {

    const { username } = route.params;
    const medicines = useSelector(state => state.medicines);
    const divided = medicines.reduce((array, item) => {
        array[item.active ? 'active' : 'inactive'].push(item);
        return array;
    }, { active: [], inactive: [] });
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
            .catch(error => console.log(error.message));

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
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' backgroundColor={primary} />
            {medicines.length > 0 ?
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 21, height: '100%' }}
                >
                    <Header
                        username={username}
                        active={divided.active.length}
                        inactive={divided.inactive.length}
                        total={medicines.length}
                    />
                    <View>
                        <Text style={styles.heading}>Active medicines</Text>
                        {divided.active.map((medicine) => {
                            return (
                                <MedicineCard
                                    medicine={medicine}
                                    key={medicine._id}
                                />
                            )
                        })}
                        {divided.inactive.length > 0 &&
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.heading}>Inactive medicines</Text>
                                {divided.inactive.map((medicine) => {
                                    return (
                                        <MedicineCard
                                            medicine={medicine}
                                            key={medicine._id}
                                        />
                                    )
                                })}
                            </View>}
                    </View>
                </ScrollView>
                :
                <View style={{ flex: 1 }}>
                    <Header
                        username={username}
                        active={0}
                        inactive={0}
                        total={0}
                    />
                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>Medicines you'll add{`\n`}will be displayed here</Text>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

export default HomeScreen;
