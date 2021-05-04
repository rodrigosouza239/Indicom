import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import Styles from './styles';
import AuthContext from '../../contexts/auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import Logo from '../../../assets/img/logo.png';

const styles = StyleSheet.create(Styles);

const LoginManual = ({ navigation }) => {
  const { logar } = useContext(AuthContext);

  const handleLogin = async (data) => {
    const response = await logar(data);
    if (!response) return Alert.alert('Erro', 'Usuário e/ou Senha inválidos');

    return true;
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={{ width: '100%', marginTop: 30 }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          style={{ backgroundColor: '#FFFEAB' }}
          scrollEnabled={false}
          keyboardOpeningTime={0}
        >
          <View style={styles.wrapper}>
            <Image source={Logo} style={styles.imageContainer} />
            <Text>A melhor plataforma comercial de indicação online!</Text>
            <Text style={styles.subTitle}>Acesse sua Conta</Text>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(data) => handleLogin(data)}
              validationSchema={yup.object().shape({
                email: yup.string().email().required(),
                password: yup.string().required(),
              })}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <View style={styles.socialMediaContainer}>
                  <Input
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    customStyle={{ marginBottom: 13 }}
                    error={errors.email}
                    value={values.email}
                  />
                  <Input
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="Senha"
                    textContentType="password"
                    secureTextEntry
                    customStyle={{ marginBottom: 13 }}
                    error={errors.password}
                    value={values.password}
                  />
                  <Button
                    onPress={handleSubmit}
                    disabled={!isValid}
                    customStyles={{
                      backgroundColor: '#FFD500',
                      marginBottom: 13,
                    }}
                    textColor="#000"
                    label="Entrar"
                  />
                </View>
              )}
            </Formik>
            <TouchableWithoutFeedback>
              <Text
                style={{ ...styles.customLink }}
                onPress={() => navigation.navigate('Cadastrar')}
              >
                Novo Cadastro?
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('RecuperarSenha')}
            >
              <Text
                style={{
                  ...styles.customLink,
                  marginTop: 15,
                  marginBottom: 30,
                }}
              >
                Esqueceu sua senha?
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};

export default LoginManual;
