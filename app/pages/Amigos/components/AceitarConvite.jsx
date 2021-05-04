import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import Api from '../../../services/Api';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

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
    alignSelf: 'flex-end',
    marginRight: '10%',
    padding: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  inserirCodigoInput: {
    width: '70%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 15,
    padding: 5,
  },
  buttonEnviarCodigo: {
    backgroundColor: '#00C068',
    width: '70%',
    marginTop: 15,
  },
});

const AceitarConvite = ({
  modalVisible,
  handleChange,
  user,
  setNewNetwork,
  setLoading,
}) => {
  const [value, setValue] = useState('');

  const changeNetworkRequest = async () => {
    if (user.code === value) {
      setValue('');
      return Alert.alert('Atenção', 'Você não pode se adicionar como amigo.');
    }
    setLoading(true);
    const { status } = await Api.post(`v1/users/${user.id}/network`, {
      code: value,
    });
    setLoading(false);
    setValue('');
    if (status === 200) {
      Alert.alert('Sucesso', 'Usuário adicionado com sucesso a sua rede.');
      setNewNetwork(true);
      return handleChange(false);
    }

    if (status === 409) {
      return Alert.alert('Atenção', 'Usuário já está em sua rede.');
    }

    if (status === 404) {
      return Alert.alert('Atenção', 'Nenhum usuário encontrado');
    }

    return Alert.alert(
      'Atenção',
      'Houve um problema na requisição, tente novamente mais tarde.'
    );
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
        <Text>Insira abaixo o código do seu amigo:</Text>
        <Input
          style={styles.inserirCodigoInput}
          keyboardType="number-pad"
          value={value}
          onChangeText={setValue}
        />
        <Button
          customStyles={styles.buttonEnviarCodigo}
          textColor="#FFF"
          textWeigth="bold"
          label="ADICIONAR AMIGO"
          onPress={() => changeNetworkRequest()}
        />
      </View>
    </Modal>
  );
};

export default AceitarConvite;
