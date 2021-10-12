import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import Moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { removeItem } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './MedicineCardStyles';

const MedicineCard = ({ medicine }) => {

    const medicines = useSelector(state => state.medicines);
    const index = medicines.indexOf(medicine);
    const dispatch = useDispatch();
    const today = Moment(new Date().setHours(0, 0, 0, 0));
    const daysLeft = Moment(medicine.endDate).diff(today, 'days');

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

    const renderTimeLeft = () => {
        const monthsLeft = Moment(medicine.endDate).diff(today, 'months');
        if (monthsLeft > 0)
            return monthsLeft === 1 ? `${monthsLeft} month left` : `${monthsLeft} months left`
        return daysLeft === 1 ? `${daysLeft} day left` : `${daysLeft} days left`;
    }

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
                <Text
                    style={
                        medicine.active ?
                            (Moment(medicine.openDate) > today ? styles.textOrange
                                :
                                (daysLeft > 15 ? styles.textGreen : styles.textRed))
                            :
                            styles.textBlack
                    }
                >
                    {Moment(medicine.openDate) <= today ?
                        `Opened on ${Moment(medicine.openDate).format('DD/MM/YY')}`
                        :
                        `Will open on ${Moment(medicine.openDate).format('DD/MM/YY')}`
                    }
                </Text>
                <Text
                    style={
                        medicine.active ?
                            (Moment(medicine.openDate) > today ?
                                styles.textOrange
                                :
                                (daysLeft > 15 ? styles.textGreen : styles.textRed))
                            : styles.textBlack
                    }
                >
                    {medicine.usageTime === 1 ?
                        `Can be open for ${medicine.usageTime} month`
                        :
                        `Can be open for ${medicine.usageTime} months`
                    }
                </Text>
                <Text
                    style={
                        medicine.active ?
                            (Moment(medicine.openDate) > today ?
                                styles.textOrange
                                :
                                (daysLeft > 15 ? styles.textGreen : styles.textRed))
                            :
                            styles.textBlack
                    }
                >
                    Should be thrown on {Moment(medicine.endDate).format('DD/MM/YY')}
                </Text>
                {medicine.active && Moment(medicine.openDate) <= today &&
                    <Text
                        style={[styles.bold,
                        medicine.active ?
                            (Moment(medicine.openDate) > today ? styles.textOrange
                                :
                                (daysLeft > 15 ? styles.textGreen : styles.textRed))
                            : styles.textBlack]}
                    >
                        {renderTimeLeft()}
                    </Text>
                }
            </View>
        </View>
    )
}

export default MedicineCard;