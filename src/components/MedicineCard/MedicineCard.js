import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import Moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { removeItem } from '../../actions';
import { useDispatch } from 'react-redux';
import { orange, green, red, black } from '../../../colors';
import { styles } from './MedicineCardStyles';

const MedicineCard = ({ medicine, index }) => {

    const onDeleteMedicine = () => {
        fetch(`http://10.0.0.5:5000/delete-medicine?id=${medicine._id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // Update store
                dispatch(removeItem(index));
            })
            .catch(error => console.log(error.message));
    }

    const calculateDaysLeft = (start, end) => {
        const today = Moment(new Date().setHours(0, 0, 0, 0));
        if (start > today)
            return "Hasn't opened";
        if (end < today)
            return "Ended";
        return end.diff(today, 'days');
    }

    const dispatch = useDispatch();
    const today = Moment(new Date().setHours(0, 0, 0, 0));
    const daysLeft = calculateDaysLeft(Moment(medicine.openDate), Moment(medicine.endDate));

    return (
        <View style={[styles.container, medicine.active ? (Moment(medicine.openDate) > today ? styles.orange : (daysLeft > 15 ? styles.green : styles.red)) : styles.black]}>
            <View style={[styles.line, medicine.active ? (Moment(medicine.openDate) > today ? styles.lineOrange : (daysLeft > 15 ? styles.lineGreen : styles.lineRed)) : styles.lineBlack]} />
            <View style={styles.items}>
                <View style={styles.header}>
                    <Text style={[styles.name, medicine.active ? (Moment(medicine.openDate) > today ? styles.textOrange : (daysLeft > 15 ? styles.textGreen : styles.textRed)) : styles.textBlack]}>{medicine.name}</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => onDeleteMedicine()}>
                        <MaterialIcons name="delete-forever" size={20} color={medicine.active ? (Moment(medicine.openDate) > today ? '#977144' : (daysLeft > 15 ? '#516c26' : '#812830')) : '#3c4143'} />
                    </TouchableOpacity>
                </View>
                <Text style={medicine.active ? (Moment(medicine.openDate) > today ? styles.textOrange : (daysLeft > 15 ? styles.textGreen : styles.textRed)) : styles.textBlack}>Opend on {Moment(medicine.openDate).format('DD/MM/YY')}</Text>
                <Text style={medicine.active ? (Moment(medicine.openDate) > today ? styles.textOrange : (daysLeft > 15 ? styles.textGreen : styles.textRed)) : styles.textBlack}>Should be thrown on {Moment(medicine.endDate).format('DD/MM/YY')}</Text>
                <Text style={medicine.active ? (Moment(medicine.openDate) > today ? styles.textOrange : (daysLeft > 15 ? styles.textGreen : styles.textRed)) : styles.textBlack}>Can be open for {medicine.usageTime} months</Text>
                <Text style={medicine.active ? (Moment(medicine.openDate) > today ? styles.textOrange : (daysLeft > 15 ? styles.textGreen : styles.textRed)) : styles.textBlack}>Days left: {daysLeft}</Text>
            </View>
        </View>
    )
}

export default MedicineCard;