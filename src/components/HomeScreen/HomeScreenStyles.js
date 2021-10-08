import { StyleSheet, Platform, StatusBar } from 'react-native';
import { background, primary } from '../../../colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    header: {
        backgroundColor: primary,
        height: 90,
        paddingVertical: 20,
        paddingHorizontal: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        marginBottom: 20,
        width: '100%'

    },
    avatar: {
        width: 45,
        height: 45,
        backgroundColor: 'white',
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        fontSize: 30,
        fontWeight: '900',
        color: primary
    },
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'capitalize',
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 10,
        width: 120,
        height: 30
    },
    buttonText: {
        color: primary
    },
    text: {
        color: 'white'
    }
});
