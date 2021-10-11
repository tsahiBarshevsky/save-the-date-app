import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FormSubmitButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={{ fontSize: 18, color: 'white' }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default FormSubmitButton;

const styles = StyleSheet.create({
    container: {
        height: 45,
        backgroundColor: 'rgba(27,27,51,0.4)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
