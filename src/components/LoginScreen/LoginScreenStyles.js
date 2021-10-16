import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { background, primary } from '../../../colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    header: {
        padding: 5,
        height: 160,
        width: '100%',
        backgroundColor: primary
    },
    scrollview: {
        backgroundColor: background,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    formContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        width: Dimensions.get('window').width,
    },
    label: {
        color: 'black',
        letterSpacing: 1,
        marginBottom: 5,
        textTransform: 'uppercase'
    },
    textInputWrapper: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#bdbdbd',
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
    }
});
