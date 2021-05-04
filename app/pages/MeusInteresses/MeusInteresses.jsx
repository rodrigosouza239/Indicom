import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import ApplicationContext from '../../contexts/application';
import AuthContext from '../../contexts/auth';
import Styles from './Styles';
import Api from '../../services/Api';

import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import CheckboxList from './CheckboxList';
import Footer from '../../components/template/Footer';

import UserIcon from '../../../assets/img/user-icon.png';

const MeusInteresses = ({ navigation }) => {
  const [list, setList] = useState([]);
  const { user, setUser, setLoading } = useContext(AuthContext);
  const { setCreatedUser } = useContext(ApplicationContext);
  // console.log(user);
  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      const response = await Api.get('v1/activities');
      if (response.status !== 200) {
        Alert.alert(
          'Erro',
          'Houve um erro no servidor, tente novamente mais tarde'
        );
      } else {
        const interestsList = user.interests.map((i) => i.id);
        setLoading(false);
        const activities = response.data.map((activity) => {
          const nest = activity.nest.map((subActivity) => {
            return {
              id: subActivity.id,
              label: subActivity.name,
              checked: interestsList.includes(subActivity.id),
            };
          });
          return {
            id: activity.id,
            label: activity.name,
            open: false,
            data: nest,
          };
        });
        setList(activities);
      }
    };
    fetchApiData();

    setCreatedUser(false);
  }, []);

  const handleSalvar = async () => {
    const meusInteresses = [];
    list.map((categoria) =>
      categoria.data.map(
        (subCategoria) =>
          subCategoria.checked && meusInteresses.push(subCategoria.id)
      )
    );
    // if (meusInteresses.length === 0) {
    //   return Alert.alert(
    //     'Erro',
    //     'É obrigatório escolher pelo menos 1 interesse'
    //   );
    // }
    setLoading(true);
    const response = await Api.post(`v1/users/${user.id}/interests`, {
      interests: meusInteresses,
    });
    setLoading(false);
    if (!response)
      return Alert.alert(
        'Erro',
        'Houve um erro no servidor, tente novamente mais tarde'
      );

    const newUser = {
      ...user,
      interests: response.data.interests,
    };
    setUser(newUser);
    return navigation.navigate('Home');
  };

  const handleOpen = (item) => {
    const newList = list.map((i) => {
      if (i.id === item.id && !item.open) return { ...i, open: true };
      return { ...i, open: false };
    });
    setList(newList);
  };

  const handleCheck = (item) => {
    const newList = list.map((categoria) => {
      const newData = categoria.data.map((subCategoria) =>
        subCategoria.id === item.id
          ? { ...subCategoria, checked: !subCategoria.checked }
          : subCategoria
      );
      return { ...categoria, data: newData };
    });
    setList(newList);
  };

  return (
    <View style={Styles.wrapper}>
      <ScrollView
        contentContainerStyle={Styles.container}
        style={{ width: '100%', height: '100%', marginTop: 20 }}
      >
        <View style={Styles.imageContainer}>
          <Image
            source={
              user.Image !== null ? { uri: user.Image.imageUrl } : UserIcon
            }
            resizeMethod="scale"
            style={Styles.iconImg}
          />
          <Text>Bem vindo {user.name}!</Text>
        </View>
        <Text style={Styles.subTitle}>Meus Interesses</Text>
        <Text>Quais ofertas deseja receber?</Text>
        <View style={Styles.socialMediaContainer}>
          {list
            .filter((i) => i.label !== 'EMPREGO/TRABALHO')
            .map((item) => (
              <Dropdown
                key={item.id}
                onPress={() => handleOpen(item)}
                handleOpen={item.open}
                label={item.label}
                style={Styles.dropdownContainer}
              >
                <CheckboxList handleCheck={handleCheck} items={item.data} />
              </Dropdown>
            ))}
          <View>
            <Text style={Styles.empregoTitle}>Ofertas de Emprego</Text>
            <Text style={Styles.empregoSubTitle}>Ofereça vagas de serviço</Text>
          </View>
          {list
            .filter((i) => i.label === 'EMPREGO/TRABALHO')
            .map((item) => (
              <Dropdown
                key={item.id}
                onPress={() => handleOpen(item)}
                handleOpen={item.open}
                label={item.label}
                style={Styles.dropdownContainer}
              >
                <CheckboxList handleCheck={handleCheck} items={item.data} />
              </Dropdown>
            ))}
          <Button
            onPress={handleSalvar}
            customStyles={{
              backgroundColor: '#00C068',
              marginTop: 15,
              width: '60%',
              alignSelf: 'center',
            }}
            textColor="#FFF"
            label="SALVAR"
          />
        </View>
      </ScrollView>
      <Footer active="Interesses" />
    </View>
  );
};

export default MeusInteresses;
