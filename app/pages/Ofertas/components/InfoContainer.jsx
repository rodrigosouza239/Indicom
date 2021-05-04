import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 7,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 5,
  },
});

const InfoContainer = ({ children, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default InfoContainer;
