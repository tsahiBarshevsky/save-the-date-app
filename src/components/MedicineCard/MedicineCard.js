import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import Moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { removeItem } from '../../actions';
import { useDispatch } from 'react-redux';
import { styles } from './MedicineCardStyles';

const MedicineCard = ({ medicine, index }) => {

    const onDeleteMedicine = () => {
        fetch(`http://10.0.0.7:5000/delete-medicine?id=${medicine._id}`)
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
    const daysLeft = calculateDaysLeft(Moment(medicine.openDate), Moment(medicine.endDate));

    return (
        <View style={[styles.container, medicine.active ? (daysLeft > 15 ? styles.green : styles.red) : styles.black]}>
            <View style={styles.header}>
                <Text style={styles.title}>{`${medicine.name}`}</Text>
                <TouchableOpacity activeOpacity={2} onPress={() => onDeleteMedicine()}>
                    <MaterialIcons name="delete-forever" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>Opend on {Moment(medicine.openDate).format('DD/MM/YY')}</Text>
            <Text style={styles.text}>Should be thrown on {Moment(medicine.endDate).format('DD/MM/YY')}</Text>
            <Text style={styles.text}>Can be open for {medicine.usageTime} months</Text>
            <Text style={styles.text}>Days left: {daysLeft}</Text>
        </View>
    )
}

export default MedicineCard;