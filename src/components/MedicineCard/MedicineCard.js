import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import Moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { removeItem, updateActive } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { styles } from './MedicineCardStyles';

const MedicineCard = ({ medicine }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const medicines = useSelector(state => state.medicines);
    const reminder = useSelector(state => state.daysLeft);
    const index = medicines.indexOf(medicine);
    const dispatch = useDispatch();
    const today = Moment(new Date().setHours(0, 0, 0, 0));
    const daysLeft = Moment(medicine.endDate).diff(today, 'days');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

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

    const onChangeActive = (id, name, newStatus) => {
        if (Moment(medicine.endDate) <= today)
            Alert.alert("Medicine has ended");
        else {
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
                    if (newStatus)
                        Alert.alert(`${name} activated`);
                    else
                        Alert.alert(`${name} deactivated`);
                    // Update store
                    dispatch(updateActive(id, newStatus));
                })
                .catch(error => console.log(error.message));
        }
    }

    const renderTimeLeft = () => {
        const monthsLeft = Moment(medicine.endDate).diff(today, 'months');
        if (monthsLeft > 0)
            return monthsLeft === 1 ? `${monthsLeft} month left` : `${monthsLeft} months left`
        return daysLeft === 1 ? `${daysLeft} day left` : `${daysLeft} days left`;
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChangeActive(medicine._id, medicine.name, !medicine.active)}
            onLongPress={() => toggleModal()}
            style={[styles.container, medicine.active ? (Moment(medicine.openDate) > today ? styles.orange : (daysLeft > reminder ? styles.green : styles.red)) : styles.black]}
        >
            <View style={[styles.line, medicine.active ? (Moment(medicine.openDate) > today ? styles.lineOrange : (daysLeft > reminder ? styles.lineGreen : styles.lineRed)) : styles.lineBlack]} />
            <View style={styles.items}>
                <Text style={[styles.name, medicine.active ? (Moment(medicine.openDate) > today ? styles.textOrange : (daysLeft > reminder ? styles.textGreen : styles.textRed)) : styles.textBlack]}>{medicine.name}</Text>
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
            <Modal animationIn='slideInLeft' animationOut='slideOutRight' isVisible={isModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Feather name="alert-triangle" size={24} color="red" style={{ marginRight: 10 }} />
                            <Text style={styles.modalTitle}>
                                Delete medicine
                            </Text>
                        </View>
                        <Text style={{ fontSize: 15, marginBottom: 15 }}>
                            Are you sure you want to delete
                            <Text style={styles.medicineName}> {medicine.name}</Text>
                            ? You can't undo this action.
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => toggleModal()}
                            style={[styles.button, styles.cancel]}
                        >
                            <Text style={[styles.buttonCaption, styles.cancelLabel]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => onDeleteMedicine()}
                            style={[styles.button, styles.delete]}
                        >
                            <Text style={[styles.buttonCaption, styles.deleteLabel]}>
                                Yes, delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

export default MedicineCard;