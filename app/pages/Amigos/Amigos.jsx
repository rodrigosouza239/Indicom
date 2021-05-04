/* eslint-disable consistent-return */
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import Api from '../../services/Api';

import AuthContext from '../../contexts/auth';

import ConvidarModal from './components/ConvidarModal';
import AceitarConvite from './components/AceitarConvite';
import SearchBtn from './components/SearchBtn';
import Button from '../../components/ButtonConvidar';
import Footer from '../../components/template/Footer';

import NetworkList from './components/NetworkList';
import ReferenceList from './components/ReferenceList';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    alignItems: 'center',
    fontFamily: 'Montserrat',
  },
  searchContainer: {
    width: '95%',
    height: 45,
    marginTop: 40,
  },
  buttonsContainer: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonConvidar: {
    backgroundColor: '#FF1400',
  },
  buttonAceitarConvite: {
    backgroundColor: '#FFD500',
  },
  container: {
    width: '95%',
    marginTop: 15,
    marginBottom: 5,
  },
  containerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerSubTitle: {
    fontSize: 12,
  },
  userListElement: {
    marginTop: 5,
    marginBottom: 5,
  },
  buttonVerMais: {
    backgroundColor: '#FFD500',
    alignSelf: 'center',
    width: '50%',
  },
});

const Amigos = () => {
  const { user } = useContext(AuthContext);
  const [busca, setBusca] = useState('');
  const [fullListFriends, setFullListFriends] = useState([]);
  const [fullListRelative, setFullListRelative] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalConvidar, setModalConvidar] = useState(false);
  const [modalAceitarConvite, setModalAceitarConvite] = useState(false);
  const [newNetwork, setNewNetwork] = useState(true);

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      const response = await Api.get(`v1/users/${user.id}/network`);
      setLoading(false);
      if (response.status !== 200) {
        Alert.alert(
          'Erro',
          'Houve um erro no servidor, tente novamente mais tarde'
        );
      } else {
        setFullListFriends(response.data.network);
        setFullListRelative(response.data.relative);
      }
    };
    if (newNetwork) {
      fetchApiData();
      setNewNetwork(false);
    }
  }, [newNetwork]);

  const searchListFriends = () => {
    return fullListFriends.filter((i) => {
      let check = false;
      if (i.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase()))
        return true;
        console.log(i)
      if( i.ActivityBranch.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase())) check = true;
      i.activities.forEach((activity) => {
        if (
          activity.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase())
        )
          check = true;
      });
      return check;
    });
  };

  const searchListRelative = () => {
    return fullListRelative.filter((i) => {
      let check = false;
      if (i.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase()))
        return true;
      if( i.ActivityBranch.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase())) check = true;
      i.activities.forEach((activity) => {
        if (
          activity.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase())
        )
          check = true;
      });
      return check;
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchContainer}>
        <SearchBtn value={busca} setValue={setBusca} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          customStyles={styles.buttonConvidar}
          textColor="#FFF"
          textWeigth="bold"
          label="ENVIAR CONVITE"
          onPress={() => setModalConvidar(true)}
        />
        <Button
          customStyles={styles.buttonAceitarConvite}
          textColor="#000"
          textWeigth="bold"
          label="CÓDIGO DO AMIGO"
          onPress={() => setModalAceitarConvite(true)}
        />
      </View>
      <ScrollView style={{ width: '100%', marginTop: 10, paddingBottom: 10 }}>
        <View style={styles.wrapper}>
          <NetworkList
            fullList={busca !== '' ? searchListFriends() : fullListFriends}
            loading={loading}
          />
          <ReferenceList
            fullList={busca !== '' ? searchListRelative() : fullListRelative}
            loading={loading}
          />
        </View>
      </ScrollView>
      <ConvidarModal
        user={user}
        modalVisible={modalConvidar}
        handleChange={setModalConvidar}
      />
      <AceitarConvite
        user={user}
        setLoading={setLoading}
        setNewNetwork={setNewNetwork}
        modalVisible={modalAceitarConvite}
        handleChange={setModalAceitarConvite}
      />
      <Footer active="Amigos" />
    </View>
  );
};

export default Amigos;
