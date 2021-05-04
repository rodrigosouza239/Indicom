import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../services/Api';
import FooterItem from './FooterItem';
import AuthContext from "../../contexts/auth";
import ApplicationContext from "../../contexts/application";
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  footer: {
    height: 70,
    width: '100%',
    backgroundColor: '#FFD500',
    zIndex: 999,
  },
  footerBody: {
    marginTop: 10,
    height: '100%',
    flexDirection: 'row',
  },
});

const Footer = ({ active }) => {
  const navigation = useNavigation();
  const {countBadgesOfertas, setcountBadgesOfertas, ultimasofertasvisualizadas} = React.useContext(ApplicationContext);
  const { user } = React.useContext(AuthContext);
  React.useEffect(()=>{
    const fetchApiData = async () => {
      const interests = user.interests.map((interest) => {
        return interest.id;
      });
      const response = await Api.post('v1/jobs', { interests });
      if (response.status !== 200) {
      } else {
        response.data && AsyncStorage.getItem('@ultimasofertasvisualizadas_storage_Key')
        .then(payload => {
          setcountBadgesOfertas((ultimasofertasvisualizadas || parseInt(payload)) == response.data.length ? 0 : response.data.length)
        })
        .catch(e => console.log(e))
      }
    };
    fetchApiData();
  },[])

  return (
    <View style={styles.footer}>
      <View style={styles.footerBody}>
        <FooterItem
          active={active}
          label="Meu Perfil"
          onPress={() => navigation.navigate('MeuPerfil')}
          icon="user-alt"
        />
        <FooterItem
          active={active}
          label="Amigos"
          onPress={() => navigation.navigate('Amigos')}
          icon="user-friends"
        />
        <FooterItem
          active={active}
          label="Interesses"
          onPress={() => navigation.navigate('MeusInteresses')}
          icon="heart"
        />
        <FooterItem
          active={active}
          countBadge={countBadgesOfertas}
          label="Ofertas"
          icon="comment-alt"
          onPress={() => navigation.navigate('OfertasRecebidas')}
        />
        <FooterItem
          active={active}
          label="Home"
          icon="home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

export default Footer;
