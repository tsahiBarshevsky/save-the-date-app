import { StyleSheet, Platform, StatusBar } from 'react-native';
import { background, primary } from '../../../colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 10,
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
        marginBottom: 10
    },
    iconWrapper: {
        backgroundColor: primary,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginRight: 15
    },
    label: {
        textTransform: 'uppercase',
        marginBottom: 5
    }
});
