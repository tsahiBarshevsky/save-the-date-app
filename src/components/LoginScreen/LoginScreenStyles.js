import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { background, primary } from '../../../colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        paddingVertical: 10,
        height: 200,
        width: '100%',
        backgroundColor: primary
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    scrollview: {
        backgroundColor: primary,
        height: '100%',
        flexGrow: 1
    },
    form: {
        backgroundColor: background,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: Dimensions.get('window').height - 200
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
    },
    resetPassword: {
        alignSelf: 'flex-end',
        marginTop: -10
    },
    submit: {
        width: '100%',
        height: 38,
        backgroundColor: primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5
    },
    submitLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2
    },
    signUp: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    link: {
        color: primary,
        fontWeight: 'bold'
    },
    splash: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});
