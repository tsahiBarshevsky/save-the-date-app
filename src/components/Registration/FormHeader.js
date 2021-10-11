import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const FormHeader = ({
    leftHeading,
    rightHeading,
    subheading,
    leftHeaderTranslateX = 40,
    rightHedaerTranslateY = -20,
    rightHeaderOpacity = 0
}) => {
    return (
        <View>
            <View style={styles.container}>
                <Animated.Text
                    style={[styles.heading, { transform: [{ translateX: leftHeaderTranslateX }] }]}
                >
                    {leftHeading}
                </Animated.Text>
                <Animated.Text
                    style={[styles.heading, { opacity: rightHeaderOpacity, transform: [{ translateY: rightHedaerTranslateY }] }]}
                >
                    {rightHeading}
                </Animated.Text>
            </View>
            <Text style={styles.subheading}>{subheading}</Text>
        </View>
    )
}

export default FormHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1b1b33'
    },
    subheading: {
        fontSize: 18,
        color: '#1b1b33',
        textAlign: 'center'
    }
});
