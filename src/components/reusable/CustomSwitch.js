import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../enums/StyleGuides';

const CustomSwitch = ({ onValueChange, value }) => {
    const toggleSwitch = () => {
        onValueChange(!value);
    };

    return (
        <TouchableOpacity onPress={toggleSwitch} style={[styles.switch, value && styles.switchOn]}>
            <View style={[styles.thumb, value ? styles.thumbOn : styles.thumbOff]}>
                <Text style={styles.thumbText}>{value ? 'ON' : 'OFF'}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CustomSwitch;

const styles = StyleSheet.create({
    switch: {
        width: 60,
        height: 35,
        borderRadius: 10,
        backgroundColor: COLORS.LIGHT_GRAY, // Background color for 'off' state
        justifyContent: 'center',
        padding: 2,
    },
    switchOn: {
        backgroundColor: COLORS.LIGHT_GRAY, // Background color for 'on' state
    },
    thumb: {
        width: 31, // Adjusted width to fit text
        height: 31,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 2,
        transition: 'all 0.2s ease', // Smooth transition for thumb position
    },
    thumbOn: {
        left: 26, // Adjusted positioning when switch is on
        backgroundColor: COLORS.ORANGE, // Thumb color when the switch is on
    },
    thumbOff: {
        backgroundColor: 'gray', // Thumb color when the switch is off
    },
    thumbText: {
        color: 'white', // Text color
        fontWeight: 'bold',
    },
});
