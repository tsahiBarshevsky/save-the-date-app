import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

const CalendarScreen = () => {

    const [selectedDate, setSelectedDate] = useState(Moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }));
    const formatedSelectedDate = selectedDate.format('YYYY-MM-DD').toString();
    const medicines = useSelector(state => state.medicines);

    const filterByDate = (item) => {
        return (
            Moment(item.openDate).isSame(selectedDate) ||
            Moment(item.endDate).isSame(selectedDate)
        );
    }

    return (
        <View>
            <Calendar
                enableSwipeMonths
                hideArrows
                onDayPress={(day) => setSelectedDate(Moment(day.timestamp).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))}
                markingType='dot'
                markedDates={
                    { [formatedSelectedDate]: { selected: true, marked: true, selectedColor: 'green' } }
                }
            />
            <Text>{selectedDate.format('DD/MM/YYYY HH:mm')}</Text>
            <ScrollView>
                {
                    medicines.filter(filterByDate).map((medicine) => {
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
