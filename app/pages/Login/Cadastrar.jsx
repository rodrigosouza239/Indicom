import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import ApplicationContext from '../../contexts/application';
import Styles from './styles';
import * as Utils from './utils';

import Button from '../../components/Button';
import Input from '../../components/Input';

import Logo from '../../../assets/img/logo.png';

const styles = StyleSheet.create(Styles);

const Cadastrar = ({ navigation }) => {
  const { setLoading, newUser, setNewUser } = useContext(ApplicationContext);

  const handleCadastro = async (data) => {
    if (data.password !== data.passwordCheck)
      return Alert.alert('Atenção', 'As senhas não conferem');
    const checkPassword = Utils.checkPassword(data.password);
    if (!checkPassword)
      return Alert.alert(
        'Atenção',
        'Senha deve ter no mínimo 6 caracteres com pelo menos uma letra e um número'
      );
    setLoading(true);
    const responseEmail = await Utils.checkEmail(data.email);
    setLoading(false);

    if (!responseEmail) return Alert.alert('Atenção', 'E-mail já cadastrado.');
    setNewUser({ ...newUser, ...data });
    return navigation.navigate('CompleteCadastro');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        style={{ width: '100%', marginTop: 30 }}
      >
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          style={{ backgroundColor: '#000' }}
          scrollEnabled
          keyboardOpeningTime={0}
        >
          <View style={styles.wrapper}>
            <Image source={Logo} style={styles.imageContainer} />
            <Text>A melhor plataforma comercial de indicação online!</Text>
            <Text style={styles.subTitle}>Nova Conta</Text>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                passwordCheck: '',
              }}
              onSubmit={(data) => handleCadastro(data)}
              validationSchema={yup.object().shape({
                name: yup.string().required(),
                email: yup.string().email().required(),
                password: yup.string().required(),
                passwordCheck: yup.string().required(),
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
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    placeholder="Qual seu nome?"
                    textContentType="name"
                    customStyle={{ marginBottom: 13 }}
                    error={errors.name}
                    value={values.name}
                  />
                  <Input
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Insira um endereço de e-mail:"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    customStyle={{ marginBottom: 13 }}
                    error={errors.email}
                    value={values.email}
                  />
                  <Input
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="Insira uma senha para sua conta:"
                    textContentType="password"
                    secureTextEntry
                    customStyle={{ marginBottom: 13 }}
                    error={errors.password}
                    value={values.password}
                  />
                  <Input
                    onChangeText={handleChange('passwordCheck')}
                    onBlur={handleBlur('passwordCheck')}
                    placeholder="Confirme sua senha:"
                    textContentType="password"
                    secureTextEntry
                    customStyle={{ marginBottom: 13 }}
                    error={errors.passwordCheck}
                    value={values.passwordCheck}
                  />
                  <Button
                    onPress={handleSubmit}
                    disabled={!isValid}
                    customStyles={{
                      backgroundColor: '#FFD500',
                      marginBottom: 13,
                    }}
                    textColor="#000"
                    label="Cadastrar"
                  />
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};

export default Cadastrar;
