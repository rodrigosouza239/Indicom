import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

import Button from '../../../components/Button';
import RateStars from '../../../components/RateStars';

import NoUser from '../../../../assets/img/user-icon.png';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#FFF',
    width: '95%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    padding: 5,
    paddingBottom: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  strong: {
    fontWeight: 'bold',
  },
  comentariosContainer: {
    alignItems: 'center',
    padding: 5,
  },
  comentario: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    paddingLeft: 5,
  },
  comentarioNome: {
    fontSize: 16,
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  comentarioContent: {
    paddingTop: 5,
  },
  userImg: {
    width: 70,
    height: 70,
  },
});

const ComentariosContainer = () => {
  const [fullList] = useState([]);
  const [list, setList] = useState([]);
  const [slice, setSlice] = useState(3);
  const [ocultos, setOcultos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      // const response = await Utils.getComentariosByUser(user);
      // const commentList = response.length > 3 ? response.slice(0, 3) : response;

      // setFullList(response);
      // setList(commentList);
      // setOcultos(response.length - commentList.length);
      setLoading(false);
    };
    // console.log('ComentariosContainer');
    getComments();
  }, []);

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

  if (loading)
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Comentários</Text>
        </View>
        <View style={styles.comentariosContainer}>
          <ActivityIndicator color="#000" />
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Comentários</Text>
      </View>
      <View style={styles.comentariosContainer}>
        {list.length === 0 ? (
          <Text>Nenhum comentário.</Text>
        ) : (
          list.map((comentario) => (
            <View
              style={styles.comentario}
              key={Math.random().toString(36).substring(7)}
            >
              <View style={styles.img}>
                <Image
                  source={
                    comentario.fromUser.Image !== null
                      ? { uri: comentario.fromUser.Image.imageUrl }
                      : NoUser
                  }
                  style={styles.userImg}
                />
              </View>
              <View style={styles.content}>
                <Text style={styles.comentarioNome}>{comentario.nome}</Text>
                <RateStars />
                <Text style={styles.comentarioContent}>
                  {comentario.content}
                </Text>
              </View>
            </View>
          ))
        )}
        {ocultos > 0 && (
          <Button
            customStyles={{
              backgroundColor: '#FFD500',
              width: '70%',
            }}
            onPress={handleVerMais}
            textWeigth="bold"
            textColor="#000"
            loading={btnLoading}
            loadingStyle={{ color: '#000' }}
            label="VER MAIS"
          />
        )}
      </View>
    </View>
  );
};

export default ComentariosContainer;
