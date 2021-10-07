import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Moment from 'moment';

const MedicineCard = ({ medicine, index }) => {

    const calculateDaysLeft = (start, end) => {
        const today = Moment(new Date().setHours(0, 0, 0, 0));
        if (start > today)
            return "Hasn't opened";
        if (end < today)
            return "Ended";
        return end.diff(start, 'days');
    }

    return (
        <View style={{ marginBottom: 10, backgroundColor: 'lightskyblue' }}>
            <Text>{`${medicine.name}:`}</Text>
            <Text>{medicine.owner}</Text>
            <Text>{`${Moment(medicine.openDate).format('DD/MM/YYYY HH:mm')} -> ${Moment(medicine.endDate).format('DD/MM/YYYY HH:mm')}`}</Text>
            <Text>Usage time: {medicine.usageTime}</Text>
            <Text>Days left: {calculateDaysLeft(Moment(medicine.openDate), Moment(medicine.endDate))}</Text>
            <Text>{medicine.active ? 'active' : 'not active'}</Text>
        </View>
    )
}

export default MedicineCard;

const styles = StyleSheet.create({});
