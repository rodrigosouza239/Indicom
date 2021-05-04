import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import AuthContext from '../../contexts/auth';
import Api from '../../services/Api';

import Footer from '../../components/template/Footer';
import InfoContainer from './components/InfoContainer';
import RateStars from '../../components/RateStars';

import ComentariosContainer from '../../components/ComentariosContainer/ComentariosContainer';

import NoUser from '../../../assets/img/user-icon.png';
import Styles from './styles';

const styles = StyleSheet.create(Styles);

const MeuPerfil = () => {
  const { user, setLoading, setUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [AtividadesLista, setAtividadesLista] = useState([]);
  const navigation = useNavigation();

  const infoItems = [
    {
      label: 'Nome',
      value: currentUser.name,
    },
    {
      label: 'E-mail',
      value: currentUser.email,
    },
    {
      label: 'Profissão',
      value:
        (currentUser.ActivityBranch && currentUser.ActivityBranch.name) ||
        (currentUser.EconomicActivity && currentUser.EconomicActivity.name) ||
        '',
    },
    {
      label: 'Empresa',
      value: currentUser.companyName,
    },
    {
      label: 'Whats',
      value: currentUser.whatsapp,
    },
    {
      label: 'Website',
      value: currentUser.website,
    },
    {
      label: 'Facebook',
      value: currentUser.facebook,
    },
  ];

  const atividadesItems = AtividadesLista.map((atividade) => {
    const response = { label: atividade.label, value: [] };
    const atividadesList = currentUser.activities.map((i) => i.id);
    atividade.data.map((categoria) => {
      if (atividadesList.includes(categoria.id)) {
        response.value.push(categoria.label);
      }
      return categoria;
    });
    return response.value.length > 0
      ? { ...response, value: response.value.join(', ') }
      : {};
  }).filter((atividade) => atividade.label);

  const createImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setLoading(true);
        const { status, data } = await Api.post(`/v1/users/${user.id}/image`, {
          image: result,
        });
        setLoading(false);
        if (status !== 200) {
          Alert.alert('Error', 'Something goes wrong in server');
        }
        setUser({ ...user, Image: { imageUrl: data.url } });
      }
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          Alert.alert(
            'Error',
            'Sorry, we need camera roll permissions to make this work!'
          );
        }
      }
    })();
  }, []);

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      const userData = await Api.get(`v1/users/${user.id}`);
      if (userData.status !== 200) {
        Alert.alert(
          'Erro',
          'Houve um erro no servidor, tente novamente mais tarde'
        );
      } else {
        setCurrentUser(userData.data);
        const response = await Api.get('v1/activities');
        if (response.status !== 200) {
          Alert.alert(
            'Erro',
            'Houve um erro no servidor, tente novamente mais tarde'
          );
        } else {
          setLoading(false);
          const activities = response.data.map((activity) => {
            const nest = activity.nest.map((subActivity) => {
              return {
                id: subActivity.id,
                label: subActivity.name,
                checked: false,
              };
            });
            return {
              id: activity.id,
              label: activity.name,
              open: false,
              data: nest,
            };
          });
          setAtividadesLista(activities);
        }
      }
    };
    fetchApiData();
  }, [user]);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={{ width: '100%', marginTop: 30 }}>
        <View style={styles.body}>
          <TouchableWithoutFeedback onPress={() => createImage()}>
            <Image
              source={
                user.Image !== null ? { uri: user.Image.imageUrl } : NoUser
              }
              style={styles.logoImage}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.userName}>
            {currentUser.name}{' '}
          </Text>
          <RateStars nota={currentUser.rate} />
          <InfoContainer
            title="Informações"
            items={infoItems}
            setCurrentUser={setCurrentUser}
            onPress={() => navigation.navigate('InformacoesGerais')}
          />
          <InfoContainer
            title="Ramo de Atividade"
            items={atividadesItems}
            onPress={() => navigation.navigate('MinhasAtividades')}
          />
          <ComentariosContainer user={user} />
        </View>
      </ScrollView>
      <Footer active="Meu Perfil" />
    </View>
  );
};

export default MeuPerfil;
