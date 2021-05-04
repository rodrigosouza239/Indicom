import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import LoadingAnimation from '../../assets/animations/4934-hand-shake.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  label: {
    color: 'white',
    fontWeight: '600',
    marginTop: 120,
  },
});

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={LoadingAnimation}
        resizeMode="contain"
        autoPlay
        loop
        style={{ opacity: 1 }}
      />
      <Text style={styles.label}>Carregando informações</Text>
    </SafeAreaView>
  );
};

export default Loading;
