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
        paddingTop: 15,
        paddingBottom: 20,
        paddingHorizontal: 35,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: 15
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15
    },
    icon: {
        transform: [{ rotate: '45deg' }],
        marginRight: 15
    },
    username: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    stat: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    statCount: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: -5
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 14
    }
});
