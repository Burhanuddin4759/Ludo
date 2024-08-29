import React, { forwardRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../enums/StyleGuides';

const CustomOTPInput = forwardRef(({ index, onChangeText }, ref) => {
  const handleTextChange = (text) => {
    onChangeText(text, index);
  };

  return (
    <TextInput
      ref={ref}
      style={styles.input}
      keyboardType="numeric"
      maxLength={1}
      onChangeText={handleTextChange}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    marginVertical: '3.5%',
    height: 70,
    width: '22%',
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDERS,
    borderRadius: 12,
    textAlign: 'center',
  }
});

export default CustomOTPInput;
