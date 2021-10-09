import { StyleSheet, Platform, StatusBar } from 'react-native';
import { background, primary } from '../../../colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        height: 65,
        backgroundColor: primary,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 15,
        marginBottom: 25
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    textInputWrapper: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#dfdfdf',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        marginBottom: 15
    },
    iconWrapper: {
        backgroundColor: primary,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    input: {
        flex: 1,
        marginHorizontal: 15
    },
    label: {
        textTransform: 'uppercase',
        marginBottom: 5
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
        borderRadius: 25,
        height: 35,
        marginTop: 15
    }
});
