import { StyleSheet } from "react-native";
import {
    green, greenLine, greenText,
    red, redText, redLine,
    orange, orangeText, orangeLine,
    black, blackLine, blackText
} from '../../../colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 5,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    cross: {
        transform: [{ translateY: 1 }]
    },
    check: {
        transform: [{ translateY: 1 }],
        marginRight: 2
    },
    text: {
        color: 'white'
    },
    items: {
        paddingVertical: 12,
        paddingRight: 20,
        paddingLeft: 15,
        width: '100%'
    },
    name: {
        fontSize: 17,
        letterSpacing: 0.5,
        fontWeight: 'bold',
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
    },
    bold: {
        fontWeight: 'bold',
        marginTop: 5
    }
});