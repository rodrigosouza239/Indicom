import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Checkbox from '../../../components/Checkbox';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 6,
  },
});

const CheckboxList = ({ items, handleCheck }) => {
  const [list, setList] = useState(items || []);

  useEffect(() => setList(items), [items]);

  return (
    <View style={styles.wrapper}>
      {list.map((item) => (
        <TouchableWithoutFeedback
          key={item.id}
          onPress={() => handleCheck(item)}
        >
          <View style={styles.container}>
            <Text>{item.label}</Text>
            <Checkbox
              handleCheck={item.checked}
              onPress={() => handleCheck(item)}
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

export default CheckboxList;
