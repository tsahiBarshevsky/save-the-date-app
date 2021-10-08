import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Moment from 'moment';
import { styles } from './CalendarScreenStyles';
import { primary } from '../../../colors';

const CalendarScreen = () => {

    const [selectedDate, setSelectedDate] = useState(Moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }));
    const [marker, setMarker] = useState({ selected: true, marked: false, selectedColor: '#ffffff', dotColor: primary })
    const formatedSelectedDate = selectedDate.format('YYYY-MM-DD').toString();
    const medicines = useSelector(state => state.medicines);

    function containsDate(date) {
        return function (item) {
            return (
                Moment(item.openDate).isSame(date) ||
                Moment(item.endDate).isSame(date)
            );
        }
    }

    const changeMarker = (day) => {
        const converted = Moment(day.timestamp).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        setSelectedDate(converted);
        if (medicines.filter(containsDate(converted)).length > 0)
            setMarker({ selected: true, marked: true, selectedColor: '#ffffff', dotColor: primary });
        else
            setMarker({ selected: true, marked: false, selectedColor: '#ffffff', dotColor: primary });
    }

    useEffect(() => {
        if (medicines.filter(containsDate(Moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))).length > 0)
            setMarker({ selected: true, marked: true, selectedColor: '#ffffff', dotColor: primary });
        else
            setMarker({ selected: true, marked: false, selectedColor: '#ffffff', dotColor: primary });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                theme={{
                    backgroundColor: primary,
                    calendarBackground: primary,
                    selectedDayTextColor: primary,
                    todayTextColor: '#FABE50',
                    dayTextColor: 'white',
                    monthTextColor: 'white',
                    textDisabledColor: '#d9e1e880',
                }}
                enableSwipeMonths
                hideArrows
                onDayPress={(day) => changeMarker(day)}
                markingType='dot'
                markedDates={{ [formatedSelectedDate]: marker }}
            />
            <Text>{selectedDate.format('DD/MM/YYYY HH:mm')}</Text>
            <ScrollView>
                {
                    medicines.filter(containsDate(selectedDate)).map((medicine) => {
                        return (
                            <View key={medicine._id}>
                                <Text>{medicine.name}</Text>
                                <Text>{`${Moment(medicine.openDate).format('DD/MM/YYYY')} -> ${Moment(medicine.endDate).format('DD/MM/YYYY')}`}</Text>
                            </View>
                        );
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default CalendarScreen;
