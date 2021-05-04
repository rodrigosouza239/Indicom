import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Logo from '../../assets/img/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEAB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Render = () => {
  const textList = [
    'Regando as plantas',
    'Criando a interface',
    'Corrigindo os bugs',
    'Empilhando algumas caixas',
    'Pagando a internet',
    'Alimentando o gato',
  ];

  const [text, setText] = useState('Acordando nossos trabalhadores');

  useEffect(() => {
    const interval = setInterval(
      () => setText(textList[Math.floor(Math.random() * textList.length)]),
      1500
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <Text>{text}</Text>
    </View>
  );
};

export default Render;
