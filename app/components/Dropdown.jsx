import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Dropdown = ({ children, label, style, handleOpen, onPress }) => {
  const [open, setOpen] = useState(handleOpen === true);

  const styles = StyleSheet.create({
    title: {
      padding: 15,
      borderColor: 'rgba(0, 0, 0, 0.25)',
      borderWidth: 1,
      borderRadius: 8,
      borderBottomLeftRadius: open ? 0 : 8,
      borderBottomRightRadius: open ? 0 : 8,
      backgroundColor: open ? '#E5E5E5' : '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {
      display: open ? 'flex' : 'none',
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: '#fff',
      borderColor: 'rgba(0, 0, 0, 0.25)',
      borderWidth: 1,
      borderTopWidth: 0,
      borderRadius: 8,
      borderTopLeftRadius: open ? 0 : 8,
      borderTopRightRadius: open ? 0 : 8,
    },
  });

  useEffect(() => setOpen(handleOpen), [handleOpen]);

  return (
    <View style={{ ...styles.container, ...style }}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.title}>
          <Text>{label}</Text>
          <Icon
            style={styles.icon}
            name={open ? 'minus' : 'plus'}
            size={15}
            color="#000"
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default Dropdown;
