import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import Api from '../../services/Api';
import DetalheFoto from './components/DetalheFoto';
import Button from '../../components/Button';
import Footer from '../../components/template/Footer';
import InfoContainer from './components/InfoContainer';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    fontFamily: 'Montserrat',
  },
  body: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 11,
  },
  infoContainer: {
    marginTop: 15,
  },
  categoriaContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  categoriaTitle: {
    fontWeight: 'bold',
  },
  donoOferta: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
  },
});

const OfertaDetalhes = ({ route }) => {
  const { oferta } = route.params;
  const navigation = useNavigation();
  const [categoriesList, setCategoriesList] = useState([]);
  const [userOwnder, setuserOwnder] = useState(null);

  useEffect(() => {
    ( async () => {
      const userData = await Api.get(`v1/users/${oferta.owner.id}`);
      setuserOwnder({...userData}.data);
    })()
    const categories = [];
    oferta.categories.map((i) => {
      const checkFather = categories.filter(
        (father) => father.id === i.father.id
      );
      if (checkFather.length === 0) categories.push({ ...i.father, nest: [] });
      categories.map((category) => {
        if (category.id === i.father.id)
          category.nest.push({ id: i.id, name: i.name });
        return category;
      });
      return i;
    });
    setCategoriesList(categories);
  }, []);
  
  return (
    <View style={styles.wrapper}>
      <ScrollView style={{ marginTop: 30 }}>
        <View>
          <DetalheFoto images={oferta.images} />
        </View>
        <View style={styles.body}>
          <Text style={styles.headerTitle}>Nova oferta publicada</Text>
          <Text style={styles.subTitle}>
            {moment(oferta.createdAt).format('LLL')}
          </Text>

          <View style={styles.infoContainer}>
            <InfoContainer title="Descrição">
              <Text>{oferta.description}</Text>
            </InfoContainer>
          </View>
          <View style={styles.infoContainer}>
            <InfoContainer title="Categoria">
              {categoriesList.map((i) => (
                <View key={i.id} style={styles.categoriaContainer}>
                  <Text style={styles.categoriaTitle}>{i.name}:</Text>
                  <Text> {i.nest.map((sub) => sub.name).join(',')}</Text>
                </View>
              ))}
            </InfoContainer>
          </View>
          <View style={styles.infoContainer}>
            <InfoContainer title="Validade">
              <Text>Até {moment(oferta.expireAt).format('LL')}.</Text>
            </InfoContainer>
          </View>
          <Text style={styles.donoOferta}>Por {oferta.owner.name}</Text>
          {/* <Text style={styles.subTitle}>Amigo de Pedro</Text> */}

          <Button
            customStyles={{
              width: '60%',
              alignSelf: 'center',
              backgroundColor: '#00C068',
              marginTop: 25,
            }}
            textWeigth="bold"
            textColor="#FFF"
            disabled={!userOwnder}
            label="Entrar em Contato"
            onPress={() => navigation.navigate('AmigosPerfil', { currentProfile: userOwnder })}
          />
        </View>
      </ScrollView>
      <Footer active="Ofertas" />
    </View>
  );
};

export default OfertaDetalhes;
