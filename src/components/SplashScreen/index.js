import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Moment from 'moment';
import * as firebaseAuth from 'firebase';
import firebase from '../../../firebase';
import { background, primary } from '../../../colors';
import { addNewItem } from '../../actions';

const SplashScreen = ({ navigation }) => {

    const [loaded] = useFonts({
        Bilal: require('../../../assets/fonts/Bilal.otf')
    });
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://10.0.0.6:5000/get-all-medicines?email=${firebase.getCurrentEmail()}`)
            .then(res => res.json())
            .then(medicines => {
                const today = Moment(new Date().setHours(0, 0, 0, 0));
                medicines.forEach((medicine) => {
                    var status = true;
                    if (Moment(medicine.endDate).isSame(today) && medicine.active) {
                        console.log('enter if');
                        status = false;
                        fetch(`http://10.0.0.6:5000/change-active-status?id=${medicine._id}`,
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

        // Get image URL
        dispatch({ type: 'SET_IMAGE_LINK', image: firebaseAuth.auth().currentUser.photoURL });

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

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <StatusBar style='dark' backgroundColor={background} />
            <View style={styles.splash}>
                <View style={styles.circle}>
                    <Text
                        style={{
                            fontFamily: 'Bilal',
                            color: 'white',
                            fontSize: 40,
                            transform: [{ translateY: 5 }, { translateX: 5 }]
                        }}
                    >
                        S
                        <Text style={{ color: primary }}>a</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    splash: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    circle: {
        backgroundColor: primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        transform: [{ translateY: 12 }]
    }
});
