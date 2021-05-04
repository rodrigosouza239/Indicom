import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

import UserListCard from './UserListCard';
import Button from '../../../components/Button';

const styles = StyleSheet.create({
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
  noResult: {
    backgroundColor: '#fff',
    marginTop: 5,
    padding: 20,
    alignItems: 'center',
  },
});

const UserList = ({ fullList, loading }) => {
  const [list, setList] = useState([]);
  const [slice, setSlice] = useState(3);
  const [ocultos, setOcultos] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const userList = fullList > 3 ? fullList.slice(0, 3) : fullList;
    setList(userList);
    setOcultos(fullList.length - userList.length);
  }, [fullList]);

  const handleVerMais = () => {
    setBtnLoading(true);
    setTimeout(() => {
      const newSlice = slice + 3;
      setSlice(newSlice);
      setOcultos(ocultos - 3);
      const newList = fullList.slice(0, newSlice);
      setList(newList);
      setBtnLoading(false);
    }, 1000);
  };

  if (list.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.containerTitle}>Referências</Text>
        {loading ? (
          <View>
            <ActivityIndicator color="#000" />
          </View>
        ) : (
          <View style={styles.noResult}>
            <Text>Nenhuma referência encontrada</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Referências</Text>
      {loading ? (
        <View>
          <ActivityIndicator color="#000" />
        </View>
      ) : (
        list.map((usuario) => (
          <View
            style={styles.userListElement}
            key={Math.random().toString(36).substring(7)}
          >
            <UserListCard user={usuario} />
          </View>
        ))
      )}
      {ocultos > 0 && (
        <View style={styles.userListElement}>
          <Button
            customStyles={styles.buttonVerMais}
            onPress={handleVerMais}
            loading={btnLoading}
            textColor="#000"
            textWeigth="bold"
            label="VER MAIS"
          />
        </View>
      )}
    </View>
  );
};

export default UserList;
