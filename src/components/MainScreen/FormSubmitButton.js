import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { primary } from '../../../colors';

const FormSubmitButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.label}>{title}</Text>
        </TouchableOpacity>
    )
}

export default FormSubmitButton;

const styles = StyleSheet.create({
    container: {
        height: 38,
        backgroundColor: primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    label: {
        color: 'white',
        fontSize: 16
    }
});
