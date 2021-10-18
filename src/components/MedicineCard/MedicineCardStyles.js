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
        marginTop: 15,
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
        marginBottom: 10
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '100%',
        alignItems: "flex-start",
        shadowColor: "#000",
        backgroundColor: "white",
        margin: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    modalTitle: {
        fontSize: 20,
    },
    medicineName: {
        fontWeight: 'bold',
        fontSize: 17
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        height: 35,
        borderRadius: 20
    },
    buttonCaption: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2
    },
    cancel: {
        borderWidth: 2,
        borderColor: '#223943',
    },
    cancelLabel: {
        color: '#223943'
    },
    delete: {
        backgroundColor: '#F1573B'
    },
    deleteLabel: {
        color: 'white'
    }
});