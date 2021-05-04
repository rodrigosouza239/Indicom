import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Share,
  Alert,
} from 'react-native';
import AuthContext from '../../contexts/auth';

import Footer from '../../components/template/Footer';
import Button from '../../components/Button';

import Logo from '../../../assets/img/logo.png';
import Styles from './styles';

const styles = StyleSheet.create(Styles);

const Home = () => {
  const { deslogar } = useContext(AuthContext);
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Instale o Indicom no seu celular!\n https://play.google.com/store/apps/details?id=com.indicom.indicom',
        url: 'https://play.google.com/store/apps/details?id=com.indicom',
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
    <View style={styles.wrapper}>
      <View style={styles.body}>
        <TouchableWithoutFeedback onPress={deslogar}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableWithoutFeedback>
        <Image source={Logo} style={styles.logoImage} />
        <Text>Porque sua indicação vale muito</Text>
        <Button
          customStyles={{
            backgroundColor: '#FF0000',
            marginTop: 60,
            width: '50%',
          }}
          textColor="#FFF"
          textWeigth="bold"
          label="NOVA OFERTA"
          onPress={() => navigation.navigate('AdicionarOferta')}
        />
        <Button
          customStyles={{
            backgroundColor: '#FFD500',
            marginTop: 10,
            width: '50%',
          }}
          textColor="#FFF"
          textWeigth="bold"
          label="ENVIAR CONVITE"
          onPress={onShare}
        />
      </View>
      <Footer active="Home" />
    </View>
  );
};

export default Home;