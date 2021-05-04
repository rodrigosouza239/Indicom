import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthContext from '../../contexts/auth';
import * as Utils from './Utils';

import Footer from '../../components/template/Footer';
import RateStars from '../../components/RateStars';
import InformacoesForm from '../../components/InformacoesForm/InformacoesForm';

import NoUser from '../../../assets/img/user-icon.png';
import Styles from './styles';

const styles = StyleSheet.create(Styles);

const InformacoesGerais = () => {
  const [keyboard, setKeyboard] = useState(false);
  const { user, setUser, setLoading } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleCadastro = async (informacoesGerais) => {
    setLoading(true);
    const newUser = { ...user, ...informacoesGerais };
    const response = await Utils.atualizarInformacoesGerais(newUser);
    setLoading(false);
    if (!response)
      return Alert.alert(
        'Erro',
        'Houve um erro ao atualizar informações, tente novamente mais tarde!'
      );
    setUser(newUser);
    return navigation.navigate('MeuPerfil');
  };

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setKeyboard(true));
    Keyboard.addListener('keyboardWillHide', () => setKeyboard(false));

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', () => setKeyboard(true));
      Keyboard.removeListener('keyboardWillHide', () => setKeyboard(false));
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={{ width: '100%', marginTop: 30 }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          keyboardOpeningTime={0}
        >
          <View style={styles.body}>
            <Image source={NoUser} style={styles.logoImage} />
            <Text style={styles.userName}>
              {user.name}{" "}
            </Text>
            <RateStars nota={user.rate} />
            <Text style={styles.titleText}>Editar Perfil</Text>
            <InformacoesForm
              buttonLabel="SALVAR"
              buttonStyles={{ backgroundColor: '#00C068', width: '75%' }}
              textColor="#FFF"
              textWeigth="bold"
              currentUser={user}
              handleCadastro={handleCadastro}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      {!keyboard && <Footer active="Meu Perfil" />}
    </View>
  );
};

export default InformacoesGerais;
