import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { background, primary, secondary } from '../../../colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        backgroundColor: primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 20,
        paddingHorizontal: 35,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'white',
        width: 85,
        height: 85,
        borderRadius: 42.5,
        marginBottom: 10
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    uploadButton: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 25,
        height: 25,
        borderRadius: 12.5,
        bottom: 0,
        right: 0
    },
    username: {
        fontSize: 20,
        marginBottom: -3.5,
        letterSpacing: 1.2,
        fontWeight: 'bold'
    },
    email: {
        fontSize: 17,
        marginBottom: 5
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
        marginBottom: 22
    },
    content: {
        marginTop: 20,
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
    },
    buttonLabel: {
        fontWeight: 'bold'
    },
    divider: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    dividerLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#223943'
    },
    rightBorder: {
        borderTopRightRadius: 1,
        borderBottomRightRadius: 1,
    },
    leftBorder: {
        borderTopLeftRadius: 1,
        borderBottomLeftRadius: 1,
    },
    dividerLabel: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: '#223943',
        textTransform: 'uppercase',
        letterSpacing: 1.5
    }
});
