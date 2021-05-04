import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ApplicationContext from '../../contexts/application';
import AuthContext from '../../contexts/auth';
import Styles from './Styles';
import Api from '../../services/Api';

import Button from '../Button';
import Dropdown from '../Dropdown';
import CheckboxList from './CheckboxList';

const RamoAtividade = () => {
  const { setLoading } = useContext(ApplicationContext);
  const { user, setUser } = useContext(AuthContext);
  // console.log(user);
  const [list, setList] = useState([]);
  const navigation = useNavigation();

  const handleCadastro = async () => {
    const ramoAtividades = [];
    list.map((categoria) =>
      categoria.data.map(
        (subCategoria) =>
          subCategoria.checked && ramoAtividades.push(subCategoria.id)
      )
    );
    const response = await Api.post(`v1/users/${user.id}/activities`, {
      activities: ramoAtividades,
    });
    if (response.status !== 200)
      return Alert.alert('Atenção', 'Houve um erro no servidor');
    const newUser = {
      ...user,
      activities: response.data.activities,
    };
    console.log(newUser);
    setUser(newUser);
    return navigation.navigate('MeuPerfil');
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
      const activitiesList = user.activities.map((i) => i.id);
      setLoading(true);
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
              checked: activitiesList.includes(subActivity.id),
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
      <View style={Styles.socialMediaContainer}>
        {user.type == "PJ" && list
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
        <View>
          <Button
            onPress={handleCadastro}
            customStyles={{
              backgroundColor: '#00C068',
              marginTop: 15,
              width: '100%',
              alignSelf: 'center',
            }}
            textColor="#FFF"
            label="SALVAR"
          />
        </View>
      </View>
    </View>
  );
};

export default RamoAtividade;
