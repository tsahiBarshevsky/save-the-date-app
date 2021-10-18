import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
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
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 100,
        marginBottom: 15
    },
    message: {
        textAlign: 'center',
        color: '#223943',
        fontWeight: 'bold',
        fontSize: 16
    },
    splashContainer: {
        flex: 1,
        backgroundColor: primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        height: Dimensions.get('window').height,
        width: '100%',
        position: 'absolute'
    },
    splash: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
});
