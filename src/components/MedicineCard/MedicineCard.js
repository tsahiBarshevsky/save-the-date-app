import React from 'react';
import { Text, View } from 'react-native'
import Moment from 'moment';
import { styles } from './MedicineCardStyles';

const MedicineCard = ({ medicine, index }) => {

    const calculateDaysLeft = (start, end) => {
        const today = Moment(new Date().setHours(0, 0, 0, 0));
        if (start > today)
            return "Hasn't opened";
        if (end < today)
            return "Ended";
        return end.diff(start, 'days');
    }

    const daysLeft = calculateDaysLeft(Moment(medicine.openDate), Moment(medicine.endDate));

    return (
        <View style={[styles.container, styles.blue]}>
            <Text style={styles.title}>{`${medicine.name}`}</Text>
            <Text style={styles.text}>Opend on {Moment(medicine.openDate).format('DD/MM/YY')}</Text>
            <Text style={styles.text}>Can be open for {medicine.usageTime} months</Text>
            <Text style={styles.text}>Days left: {daysLeft}</Text>
        </View>
    )
}

export default MedicineCard;