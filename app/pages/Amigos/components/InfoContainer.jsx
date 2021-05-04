import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from '../../../components/Button';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#FFF',
    width: '95%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    padding: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  strong: {
    fontWeight: 'bold',
  },
  textInfo: {
    marginTop: 3,
    marginBottom: 3,
  },
});

const InfoContainer = ({ title, items, onPress, noButton }) => {
  const [list, setList] = useState(items || []);
  useEffect(() => setList(items || []), [items]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {!noButton && (
          <Button
            customStyles={{
              backgroundColor: '#FFD500',
              width: 80,
              borderRadius: 8,
              padding: 5,
            }}
            onPress={onPress}
            textColor="#000"
            label="Editar"
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        {list.map((item) => (
          <Text
            style={styles.textInfo}
            key={Math.random().toString(36).substring(7)}
          >
            <Text style={styles.strong}>{item.label}:</Text> {item.value}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default InfoContainer;
