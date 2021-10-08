import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginHorizontal: 20,
        marginBottom: 15,
        borderWidth: 2
    },
    green: {
        backgroundColor: '#1b5e2099',
        borderColor: '#1b5e20'
    },
    red: {
        backgroundColor: '#b71c1c99',
        borderColor: '#b71c1c'
    },
    black: {
        backgroundColor: '#21212199',
        borderColor: '#212121'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18
    },
    text: {
        color: 'white'
    }
});