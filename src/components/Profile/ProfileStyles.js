import { StyleSheet, Platform, StatusBar } from 'react-native';
import { background, primary, secondary } from '../../../colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        backgroundColor: primary,
        height: 90,
        paddingVertical: 20,
        paddingHorizontal: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 20,
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
    text: {
        color: 'white'
    },
    title: {
        color: 'gray',
        fontSize: 18,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    scrollView: {
        height: '100%',
        marginTop: 20,
        marginBottom: 22,
        paddingHorizontal: 20
    },
    statistics: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%'
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginBottom: 20
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
        paddingHorizontal: 15,
        marginBottom: 15
    },
    input: {
        flex: 1,
        marginRight: 15
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary,
        borderRadius: 25,
        height: 37,
        marginTop: 5
    }
});
