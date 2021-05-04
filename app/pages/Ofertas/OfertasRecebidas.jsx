import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AuthContext from '../../contexts/auth';
import ApplicationContext from '../../contexts/application';
import Api from '../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from '../../components/template/Footer';
import OfertaCard from './components/OfertaCard';
import AdicionarButton from './components/AdicionarButton';
import MenuLateral from './components/MenuLateral';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    fontFamily: 'Montserrat',
    height: '100%',
  },
  body: {
    flex: 1,
    height: '100%',
  },
  ofertasHeader: {
    flexDirection: 'row',
    marginTop: 45,
    marginBottom: 20,
    paddingLeft: 15,
  },
  titleHeaderWrapper: {
    paddingLeft: 10,
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  titleHeaderSub: {
    fontSize: 11,
  },
  ofertasContainer: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 10,
  },
});

const Ofertas = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ofertas, setOfertas] = useState([]);
  const {countBadgesOfertas, setcountBadgesOfertas, setultimasofertasvisualizadas} = useContext(ApplicationContext);

  useEffect(() => {
    const fetchApiData = async () => {
      const interests = user.interests.map((interest) => {
        return interest.id;
      });
      setLoading(true);
      const response = await Api.post('v1/jobs', { interests });
      if (response.status !== 200) {
        Alert.alert(
          'Atenção',
          'Houve um erro no servidor, tente novamente mais tarde'
        );
      } else {
        setLoading(false);
        setOfertas(response.data);
        response.data && setultimasofertasvisualizadas(response.data.length)
        await AsyncStorage.setItem('@ultimasofertasvisualizadas_storage_Key', JSON.stringify(response.data.length))
        setcountBadgesOfertas(0)
      }
    };
    fetchApiData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        <TouchableWithoutFeedback onPress={() => setMenuOpen(!menuOpen)}>
          <View style={styles.ofertasHeader}>
            <Icon name="bars" size={20} solid color="#000" />

            <View style={styles.titleHeaderWrapper}>
              <Text style={styles.titleHeader}>Ofertas Recebidas</Text>
              <Text style={styles.titleHeaderSub}>
                Com base nos seus interesses
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <ScrollView>
          <View style={styles.ofertasContainer}>
            {ofertas.length > 0 ? (
              ofertas.map((oferta) => (
                <OfertaCard
                  oferta={oferta}
                  key={oferta.id}
                />
              ))
            ) : (
              <View>
                <Text>Nenhuma oferta encontrada</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <AdicionarButton />
      <MenuLateral handleOpen={menuOpen} handleAction={setMenuOpen} />
      <Footer active="Ofertas" />
    </View>
  );
};

export default Ofertas;
