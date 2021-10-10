import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';
import {
    green, greenLine, greenText,
    red, redText, redLine,
    orange, orangeText, orangeLine,
    black, blackLine, blackText
} from '../../../../colors';

const Card = ({ name, start, end, active }) => {

    const today = Moment(new Date().setHours(0, 0, 0, 0));
    const daysLeft = Moment(end).diff(today, 'days');

    return (
        <View style={[styles.container, active ? (Moment(start) > today ? styles.orange : (daysLeft > 15 ? styles.green : styles.red)) : styles.black]}>
            <View style={[styles.line, active ? (Moment(start) > today ? styles.lineOrange : (daysLeft > 15 ? styles.lineGreen : styles.lineRed)) : styles.lineBlack]} />
            <View style={styles.items}>
                <Text style={[styles.name, active ? (Moment(start) > today ? styles.textOrange : (daysLeft > 15 ? styles.textGreen : styles.textRed)) : styles.textBlack]}>{name}</Text>
                <Text style={active ? (Moment(start) > today ? styles.textOrange : (daysLeft > 15 ? styles.textGreen : styles.textRed)) : styles.textBlack}>
                    {Moment(start).format('DD/MM/YYYY')} to {Moment(end).format('DD/MM/YYYY')}
                </Text>
            </View>
        </View >
    )
}

export default Card;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 20,
    },
    green: {
        borderRadius: 10,
        backgroundColor: green
    },
    red: {
        borderRadius: 10,
        backgroundColor: red
    },
    orange: {
        borderRadius: 10,
        backgroundColor: orange
    },
    black: {
        borderRadius: 10,
        backgroundColor: black
    },
    line: {
        width: 7,
        marginRight: 15,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    lineGreen: {
        backgroundColor: greenLine
    },
    lineRed: {
        backgroundColor: redLine
    },
    lineOrange: {
        backgroundColor: orangeLine
    },
    lineBlack: {
        backgroundColor: blackLine
    },
    items: {
        paddingVertical: 12
    },
    name: {
        marginBottom: 5,
        fontSize: 17,
        letterSpacing: 0.5,
        fontWeight: '600'
    },
    textGreen: {
        color: greenText
    },
    textRed: {
        color: redText
    },
    textOrange: {
        color: orangeText
    },
    textBlack: {
        color: blackText
    }
});
