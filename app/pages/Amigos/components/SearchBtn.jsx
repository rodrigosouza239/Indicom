import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    paddingRight: 10,
  },
});

const SearchBtn = ({ value, setValue }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por Nome, Profissão ou ramo Comercial"
        value={value}
        onChangeText={setValue}
      />
      <Icon name="search" style={styles.icon} size={20} color="#000" />
    </View>
  );
};

export default SearchBtn;
