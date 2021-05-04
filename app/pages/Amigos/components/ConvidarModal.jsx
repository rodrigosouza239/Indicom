import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Share,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';

import Button from '../../../components/Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFEBD',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 8,
  },
  closeButton: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5,
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerTitle: {
    fontSize: 10,
  },
  strongText: {
    fontWeight: 'bold',
  },
  buttonEnviarCodigo: {
    backgroundColor: '#FF1400',
    width: '70%',
    marginTop: 15,
    marginBottom: 15,
  },
});

const ConvidarModal = ({ modalVisible, handleChange, user }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message: `O meu código Indicom é: ${user.code}\nInstale no seu celular! https://play.google.com/store/apps/details?id=com.indicom.indicom`,
        url:
          'https://play.google.com/store/apps/details?id=com.indicom.indicom',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Atenção', error.message);
    }
  };

  return (
    <Modal
      transparent
      avoidKeyboard
      isVisible={modalVisible}
      onSwipeComplete={() => handleChange(false)}
      swipeDirection="up"
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => handleChange(false)}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Faça novos Amigos!</Text>
        <Text>Convide amigos para sua Network</Text>
        <Button
          customStyles={styles.buttonEnviarCodigo}
          textColor="#FFF"
          textWeigth="bold"
          label="ENVIAR MEU CÓDIGO"
          onPress={() => onShare()}
        />
      </View>
    </Modal>
  );
};

export default ConvidarModal;
