import React, { useContext, useEffect } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import ApplicationContext from '../../../contexts/application';
import AuthContext from '../../../contexts/auth';
import Styles from './Styles';

import Button from '../../../components/Button';

import UserIcon from '../../../../assets/img/user-icon.png';

const CadastroConcluido = ({ navigation }) => {
  const { newUser, setCreatedUser } = useContext(ApplicationContext);
  const { logar } = useContext(AuthContext);

  useEffect(() => {
    setCreatedUser(true);
  }, []);

  const handleLogin = async () => {
    const { email, password } = newUser;
    const response = await logar({ email, password });
    if (!response) {
      Alert.alert('Erro', 'Erro de cadastro, favor contatar o administrador.');
      return navigation.navigate('Login');
    }
    return navigation.navigate('MeusInteresses');
  };

  return (
    <View style={Styles.wrapper}>
      <Image source={UserIcon} style={Styles.iconImg} />
      <Text style={Styles.bemVindoText}>Bem vindo {newUser.name}!</Text>
      <Text style={Styles.subTitle}>Cadastro Concluído</Text>
      <Text>Pronto para a próxima etapa?</Text>
      <View style={Styles.socialMediaContainer}>
        <Button
          onPress={() => handleLogin()}
          customStyles={{
            backgroundColor: '#FFD500',
            marginTop: 15,
            width: '90%',
            alignSelf: 'center',
          }}
          textColor="#000"
          label="Ir para Meus Interesses"
        />
      </View>
    </View>
  );
};

export default CadastroConcluido;
