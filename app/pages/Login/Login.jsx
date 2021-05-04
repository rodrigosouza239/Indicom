import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Linking,
  Alert,
  fetch,
} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

import Styles from './styles';

import Button from '../../components/Button';

import Logo from '../../../assets/img/logo.png';

const styles = StyleSheet.create(Styles);

const Login = ({ navigation }) => {
  const handleGoogleLogin = async () => {
    try {
      // const config = {
      //   issuer: 'https://accounts.google.com',
      //   scopes: ['openid', 'profile'],
      //   clientId:
      //     '44857672388-a6rjochc0ig0qa3fn992oq537d65hkq2.apps.googleusercontent.com',
      // };
      // const authState = await AppAuth.authAsync(config);
      // console.log('signInAsync', authState);
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId:
          '44857672388-a6rjochc0ig0qa3fn992oq537d65hkq2.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      console.log(result);
    } catch (error) {
      console.log('Erro: ', error);
    }
  };

  const handleFacebookLogin = async () => {
    console.log('FACEBOOK LOGIN');
    try {
      await Facebook.initializeAsync('14686e25b217fbe432e03430c23bc2ad22');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch (message) {
      console.log(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={{ width: '100%', marginTop: 20 }}>
        <View style={styles.container}>
          <Image source={Logo} style={styles.imageContainer} />
          <Text>A melhor plataforma comercial de indicação online!</Text>
          <Text style={styles.subTitle}>Bem vindo!</Text>
          <View style={styles.socialMediaContainer}>
            <Button
              customStyles={{ backgroundColor: '#3B5998', marginBottom: 13 }}
              label="Entrar com Facebook"
              onPress={() => handleFacebookLogin()}
            />
            <Button
              customStyles={{ backgroundColor: '#DB4437', marginBottom: 13 }}
              label="Entrar com Google"
              onPress={() => handleGoogleLogin()}
            />
            <Button
              customStyles={{ backgroundColor: '#FFD500', marginBottom: 13 }}
              textColor="#000"
              label="Login/Cadastrar"
              onPress={() => navigation.navigate('LoginManual')}
            />
          </View>
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL('https://indicom.club/')}
          >
            <Text style={{ ...styles.customLink, marginTop: 10 }}>
              Acesse nosso site
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
