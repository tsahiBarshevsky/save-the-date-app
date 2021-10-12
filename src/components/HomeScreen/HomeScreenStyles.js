import { StyleSheet, Platform, StatusBar } from 'react-native';
import { background, primary } from '../../../colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    heading: {
        color: 'gray',
        fontSize: 18,
        marginBottom: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        marginHorizontal: 20
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    message: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15
    }
});
