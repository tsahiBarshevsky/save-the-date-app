import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

const CalendarScreen = () => {

    const [selectedDate, setSelectedDate] = useState(Moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }));
    const [marker, setMarker] = useState({ selected: true, marked: false, selectedColor: '#0D5C46' })
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
            setMarker({ selected: true, marked: true, selectedColor: 'green' });
        else
            setMarker({ selected: true, marked: false, selectedColor: 'green' });
    }

    useEffect(() => {
        if (medicines.filter(containsDate(Moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))).length > 0)
            setMarker({ selected: true, marked: true, selectedColor: 'green' });
        else
            setMarker({ selected: true, marked: false, selectedColor: 'green' });
    }, []);

    return (
        <View>
            <Calendar
                enableSwipeMonths
                hideArrows
                onDayPress={(day) => changeMarker(day)}
                markingType='dot'
                markedDates={
                    { [formatedSelectedDate]: marker }
                }
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
        </View>
    )
}

export default CalendarScreen;

const styles = StyleSheet.create({});
