import React from 'react';
import { StyleSheet, Dimensions, View, KeyboardAvoidingView, Platform } from 'react-native';

const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}
        >
            {children}
        </KeyboardAvoidingView>
    )
}

export default FormContainer;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
        width: Dimensions.get('window').width,
    },
});
