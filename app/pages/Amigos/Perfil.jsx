import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../services/Api';

import AuthContext from '../../contexts/auth';

import Button from '../../components/Button';
import Footer from '../../components/template/Footer';
import InfoContainer from './components/InfoContainer';
import RateStars from '../../components/RateStars';
import ComentariosContainer from '../../components/ComentariosContainer/ComentariosContainer';

import NoUser from '../../../assets/img/user-icon.png';
import Styles from './styles';

const styles = StyleSheet.create(Styles);

const Perfil = ({ route }) => {
  const { user, setLoading } = useContext(AuthContext);
  const [nota, setNota] = useState(0);
  const [done, setDone] = useState(false);
  const [AtividadesLista, setAtividadesLista] = useState([]);
  const [renderComentarios, setRenderComentarios] = useState(false);
  const { currentProfile, newComment } = route.params;
  console.log(currentProfile);
  const navigation = useNavigation();

  const infoItems = [
    {
      label: 'Nome',
      value: currentProfile.name,
    },
    {
      label: 'E-mail',
      value: currentProfile.email,
    },
    {
      label: 'Profissão',
      value:
        (currentProfile.ActivityBranch && currentProfile.ActivityBranch.name) ||
        (currentProfile.EconomicActivity &&
          currentProfile.EconomicActivity.name) ||
        '',
    },
    {
      label: 'Empresa',
      value: currentProfile.companyName,
    },
    {
      label: 'Whats',
      value: currentProfile.whatsapp,
    },
    {
      label: 'Website',
      value: currentProfile.website,
    },
    {
      label: 'Facebook',
      value: currentProfile.facebook,
    },
  ];

  const atividadesItems = AtividadesLista.map((atividade) => {
    const response = { label: atividade.label, value: [] };
    const atividadesList = currentProfile ? currentProfile.activities.map((i) => i.id) : [];
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

  useEffect(() => {
    setRenderComentarios(newComment);
    if (newComment && newComment.fromUserId === user.id) {
      setDone(false);
    }
  }, [newComment]);

  useEffect(() => {
    const fetchApi = async () => {
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
    };
    fetchApi();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={{ width: '100%', marginTop: 30 }}>
        <View style={styles.body}>
          <Image
            source={
              currentProfile.Image !== null
                ? { uri: currentProfile.Image.imageUrl }
                : NoUser
            }
            style={styles.logoImage}
          />
          <Text style={styles.userName}>
            {currentProfile.name}{" "}
          </Text>
          <RateStars nota={nota} />
          <InfoContainer title="Informações" items={infoItems} noButton />
          <InfoContainer
            title="Ramo de Atividade"
            items={atividadesItems}
            noButton
          />
          <ComentariosContainer
            renderComentarios={renderComentarios}
            user={currentProfile}
            setNota={setNota}
            setDone={setDone}
            loggedUser={user}
          />
          {done && (
            <Button
              customStyles={{
                backgroundColor: '#00C068',
                marginTop: 10,
                width: '80%',
              }}
              onPress={() =>
                navigation.navigate('AmigosComentario', { currentProfile })
              }
              textColor="#FFF"
              textWeigth="bold"
              label="ADICIONAR COMENTÁRIO"
            />
          )}
        </View>
      </ScrollView>
      <Footer active="Amigos" />
    </View>
  );
};

export default Perfil;
