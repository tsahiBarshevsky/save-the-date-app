import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import Moment from 'moment';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { removeItem, updateActive } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './MedicineCardStyles';

const MedicineCard = ({ medicine }) => {

    const medicines = useSelector(state => state.medicines);
    const reminder = useSelector(state => state.daysLeft);
    const index = medicines.indexOf(medicine);
    const dispatch = useDispatch();
    const today = Moment(new Date().setHours(0, 0, 0, 0));
    const daysLeft = Moment(medicine.endDate).diff(today, 'days');

    const onDeleteMedicine = () => {
        fetch(`http://10.0.0.3:5000/delete-medicine?id=${medicine._id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // Update store
                dispatch(removeItem(index));
            })
            .catch(error => console.log(error.message));
    }

    const onChangeActive = (id, newStatus) => {
        fetch(`http://10.0.0.3:5000/change-active-status?id=${id}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ active: newStatus })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // Update store
                dispatch(updateActive(id, newStatus));
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
        <View style={[styles.container, medicine.active ? (Moment(medicine.openDate) > today ? styles.orange : (daysLeft > reminder ? styles.green : styles.red)) : styles.black]}>
            <View style={[styles.line, medicine.active ? (Moment(medicine.openDate) > today ? styles.lineOrange : (daysLeft > reminder ? styles.lineGreen : styles.lineRed)) : styles.lineBlack]} />
            <View style={styles.items}>
                <Text>{medicine._id}</Text>
                <View style={styles.header}>
                    <Text style={[styles.name, medicine.active ? (Moment(medicine.openDate) > today ? styles.textOrange : (daysLeft > reminder ? styles.textGreen : styles.textRed)) : styles.textBlack]}>{medicine.name}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => onDeleteMedicine()}>
                            <MaterialIcons name="delete-forever" size={20} color={medicine.active ? (Moment(medicine.openDate) > today ? '#977144' : (daysLeft > reminder ? '#516c26' : '#812830')) : '#3c4143'} />
                        </TouchableOpacity>
                        {Moment(medicine.endDate) > today &&
                            <TouchableOpacity activeOpacity={0.7} onPress={() => onChangeActive(medicine._id, !medicine.active)}>
                                {medicine.active ?
                                    <Entypo name="cross" size={25} style={styles.cross} color={medicine.active ? (Moment(medicine.openDate) > today ? '#977144' : (daysLeft > reminder ? '#516c26' : '#812830')) : '#3c4143'} />
                                    :
                                    <Entypo name="check" size={20} style={styles.check} color={medicine.active ? (Moment(medicine.openDate) > today ? '#977144' : (daysLeft > reminder ? '#516c26' : '#812830')) : '#3c4143'} />}
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <Text
                    style={
                        medicine.active ?
                            (Moment(medicine.openDate) > today ? styles.textOrange
                                :
                                (daysLeft > reminder ? styles.textGreen : styles.textRed))
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
                                (daysLeft > reminder ? styles.textGreen : styles.textRed))
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
                                (daysLeft > reminder ? styles.textGreen : styles.textRed))
                            :
                            styles.textBlack
                    }
                >
                    {Moment(medicine.endDate) > today ?
                        `Should be thrown on ${Moment(medicine.endDate).format('DD/MM/YY')}`
                        :
                        `Was thrown away on ${Moment(medicine.endDate).format('DD/MM/YY')}`
                    }
                </Text>
                {medicine.active && Moment(medicine.openDate) <= today &&
                    <Text
                        style={[styles.bold,
                        medicine.active ?
                            (Moment(medicine.openDate) > today ? styles.textOrange
                                :
                                (daysLeft > reminder ? styles.textGreen : styles.textRed))
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