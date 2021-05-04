import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

import Button from '../../components/Button';
import Footer from '../../components/template/Footer';

import CashIcon from '../../../assets/img/cash-icon.png';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    fontFamily: 'Montserrat',
  },
  body: {
    flex: 1,
    marginTop: 60,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 3,
    marginRight: 5,
  },
  aproveite: {
    fontSize: 18,
    color: '#FF0000',
    marginTop: 30,
    marginBottom: 15,
  },
});

const MeusCreditos = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Meus Créditos</Text>
          <Image source={CashIcon} />
        </View>
        <Text style={styles.subTitle}>Você possui:</Text>
        <Button
          customStyles={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FFD500',
            marginTop: 25,
          }}
          fontSize={20}
          textWeigth="bold"
          textColor="#000"
          label={`${user.credits} créditos`}
          onPress={() => navigation.navigate('OfertasRecebidas')}
        />
        <Text style={styles.aproveite}>APROVEITE!</Text>
        <Button
          customStyles={{
            width: '60%',
            alignSelf: 'center',
            backgroundColor: '#00C068',
            marginTop: 25,
          }}
          textWeigth="bold"
          textColor="#FFF"
          label="Ir para Ofertas"
          onPress={() => navigation.navigate('OfertasRecebidas')}
        />
      </View>
      <Footer active="Ofertas" />
    </View>
  );
};

export default MeusCreditos;
