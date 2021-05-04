import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    padding: 15,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal:10
  },
});

const Input = (props) => {
  const { customStyle, error } = props;
  return (
    <TextInput
      style={{
        ...styles.textInput,
        ...customStyle,
        borderColor: error ? 'red' : 'rgba(0, 0, 0, 0.25)',
        borderWidth: error ? 2 : 1,
      }}
      {...props}
    />
  );
};

export default Input;
