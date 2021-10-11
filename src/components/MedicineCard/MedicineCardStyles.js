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
        marginBottom: 15
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
        //marginRight: 15,
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