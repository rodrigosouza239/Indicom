import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AuthContext from '../../contexts/auth';

import Footer from '../../components/template/Footer';
import RateStars from '../../components/RateStars';
import AtividadesContainer from '../../components/AtividadesContainer/AtividadesContainer';

import NoUser from '../../../assets/img/user-icon.png';
import Styles from './styles';

const styles = StyleSheet.create(Styles);

const MinhasAtividades = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={{ width: '100%', marginTop: 30 }}>
        <View style={styles.body}>
          <Image source={NoUser} style={styles.logoImage} />
          <Text style={styles.userName}>
            {user.name}{" "}
          </Text>
          <RateStars nota={user.rate} />
          {
            user.type == "PJ" &&
            <>
              <Text style={styles.titleText}>Editar Meu Ramo de Atividades</Text>
              <Text style={styles.subTitleText}>Para suas futuras ofertas</Text>
            </>
          }
          <View style={styles.atividadesContainer}>
            <AtividadesContainer currentAtividades={user.atividades} />
          </View>
        </View>
      </ScrollView>
      <Footer active="Meu Perfil" />
    </View>
  );
};

export default MinhasAtividades;
