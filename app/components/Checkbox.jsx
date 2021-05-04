import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Checkbox = ({ handleCheck, onPress }) => {
  const [checked, setChecked] = useState(handleCheck === true);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: checked ? '#00C068' : '#E5E5E5',
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  useEffect(() => setChecked(handleCheck), [handleCheck]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon name="check" size={15} color={checked ? '#FFF' : '#000'} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Checkbox;
