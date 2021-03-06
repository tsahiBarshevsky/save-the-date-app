import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { styles } from './HomeScreenStyles';
import MedicineCard from '../MedicineCard/MedicineCard';
import { primary } from '../../../colors';
import Header from './Header';

const HomeScreen = ({ route }) => {

    const { username } = route.params;
    const image = require('../../../assets/sticker.png');
    const medicines = useSelector(state => state.medicines);
    const divided = medicines.reduce((array, item) => {
        array[item.active ? 'active' : 'inactive'].push(item);
        return array;
    }, { active: [], inactive: [] });

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
                        <Image
                            source={image}
                            resizeMode='contain'
                            style={styles.image}
                        />
                        <Text style={styles.message}>
                            Medicines you'll add{`\n`}will be displayed here
                        </Text>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

export default HomeScreen;
