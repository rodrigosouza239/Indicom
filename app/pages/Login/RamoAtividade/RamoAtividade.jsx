import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import ApplicationContext from '../../../contexts/application';
import Styles from './Styles';
import * as Utils from './Utils';
import Api from '../../../services/Api';

import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';
import CheckboxList from './CheckboxList';

import UserIcon from '../../../../assets/img/user-icon.png';

const RamoAtividade = ({ navigation }) => {
  const [list, setList] = useState([]);
  const { newUser, setNewUser, setLoading } = useContext(ApplicationContext);

  const handleCadastro = async () => {
    const ramoAtividades = [];
    list.map((categoria) =>
      categoria.data.map(
        (subCategoria) =>
          subCategoria.checked && ramoAtividades.push(subCategoria.id)
      )
    );
    if (ramoAtividades.length === 0) {
      return Alert.alert(
        'Erro',
        'É obrigatório escolher pelo menos 1 ramo de atividade'
      );
    }
    setLoading(true);
    const user = { ...newUser, ramoAtividades };
    const response = await Utils.cadastrar(user);
    setLoading(false);
    if (!response)
      return Alert.alert(
        'Erro',
        'Houve um erro no servidor, tente novamente mais tarde'
      );

    setNewUser(user);
    return navigation.navigate('CadastroConcluido');
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

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      const response = await Api.get('v1/activities');
      console.log(response)
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
        setList(activities);
      }
    };
    fetchApiData();
  }, []);

  return (
    <View style={Styles.wrapper}>
      <ScrollView
        contentContainerStyle={Styles.container}
        style={{ width: '100%' }}
      >
        <Image source={UserIcon} style={Styles.iconImg} />
        <Text style={Styles.bemVindoText}>Bem vindo {newUser.name}!</Text>
        <Text style={Styles.subTitle}>Meu Ramo de Atividade</Text>
        <Text>Para suas futuras ofertas</Text>
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
            onPress={handleCadastro}
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
    </View>
  );
};

export default RamoAtividade;
