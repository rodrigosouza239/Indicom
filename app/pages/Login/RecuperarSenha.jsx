import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, ScrollView, Alert } from 'react-native';
import * as Linking from 'expo-linking'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import Styles from './styles';
import Api from '../../services/Api';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ApplicationContext from '../../contexts/application';

import Logo from '../../../assets/img/logo.png';

const styles = StyleSheet.create(Styles);

const RecuperarSenha = () => {
  const navigation = useNavigation();
  const { setLoading } = React.useContext(ApplicationContext);

  const handleRecover = async (data) => {
    let redirectUrl = Linking.makeUrl('/app/pages/Login/NovaSenha.jsx', {
      queryParams: JSON.stringify({
        nameRoute: "NovaSenha",
        code: 'CODEPLACEHOLDER',
      })
    });
    setLoading(true);
    const response = await Api.post(`v1/recovery-password`, {
      email: data.email,
      url: redirectUrl
    });
    setLoading(false);
    if (response.status != 200) {
      Alert.alert(
        'Atenção',
        "Erro ao tentar recuperar senha, verifique se o e-mail está correto"
      );
    } else {
      Alert.alert(
        'Sucesso',
        "Instruções para redefinição de senha enviados para o e-mail informado"
      );

      return navigation.navigate('LoginManual');
    }

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
            <Text style={styles.subTitle}>Recuperar Senha</Text>
            <Formik
              initialValues={{ email: '' }}
              onSubmit={(data) => handleRecover(data)}
              validationSchema={yup.object().shape({
                email: yup.string().email().required(),
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
                    placeholder="E-mail cadastrado..."
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    customStyle={{ marginBottom: 13 }}
                    error={errors.email}
                    value={values.email}
                  />
                  <Button
                    onPress={handleSubmit}
                    disabled={!isValid}
                    customStyles={{
                      backgroundColor: '#FFD500',
                      marginBottom: 13,
                    }}
                    textColor="#000"
                    label="Enviar"
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

export default RecuperarSenha;
