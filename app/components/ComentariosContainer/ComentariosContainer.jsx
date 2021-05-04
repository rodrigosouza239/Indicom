import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Api from '../../services/Api';
import AuthContext from '../../contexts/auth';

import Button from '../Button';
import RateStars from '../RateStars';

import NoUser from '../../../assets/img/user-icon.png';

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
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

const ComentariosContainer = ({
  user,
  renderComentarios,
  setNota,
  setDone,
  loggedUser,
}) => {
  const { deslogar } = useContext(AuthContext);
  const [fullList, setFullList] = useState([]);
  const [list, setList] = useState([]);
  const [slice, setSlice] = useState(3);
  const [ocultos, setOcultos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      const comments = await Api.get(`v1/users/${user.id}/comments`);
      if (comments.status !== 200) {
        if (comments.status === 401) {
          deslogar();
        } else {
          Alert.alert(
            'Atenção',
            'Houve um problema no servidor para encontrar os comentários'
          );
        }
      } else {
        const commentList =
          comments.data.length > 3 ? comments.data.slice(0, 3) : comments.data;

        setFullList(comments.data);
        setList(commentList);
        setOcultos(comments.data.length - commentList.length);

        if (setNota) {
          let ownComment = false;
          let rate = 0;
          comments.data.map((i) => {
            rate = parseInt(rate, 10) + parseInt(i.rate, 10);
            if (i.fromUser.id === loggedUser.id) ownComment = true;
            return i;
          });
          rate = parseFloat(parseFloat(rate / comments.data.length).toFixed(2));
          setNota(rate || 0);
          if (setDone && !ownComment) setDone(true);
        }

        setLoading(false);
      }
    };

    getComments();
  }, [renderComentarios]);

  useEffect(() => {
    const getComments = async () => {
      const comments = await Api.get(`v1/users/${user.id}/comments`);
      if (comments.status !== 200) {
        if (comments.status === 401) {
          deslogar();
        } else {
          Alert.alert(
            'Atenção',
            'Houve um problema no servidor para encontrar os comentários'
          );
        }
      } else {
        const commentList =
          comments.data.length > 3 ? comments.data.slice(0, 3) : comments.data;

        setFullList(comments.data);
        setList(commentList);
        setOcultos(comments.data.length - commentList.length);

        if (setNota) {
          let ownComment = false;
          let rate = 0;
          comments.data.map((i) => {
            rate = parseInt(rate, 10) + parseInt(i.rate, 10);
            if (i.fromUser.id === loggedUser.id) ownComment = true;
            return i;
          });
          rate = parseFloat(parseFloat(rate / comments.data.length).toFixed(2));
          setNota(rate || 0);
          if (setDone && !ownComment) setDone(true);
        }

        setLoading(false);
      }
    };

    getComments();
  }, []);

  const handleVerMais = () => {
    setBtnLoading(true);
    const newSlice = slice + 3;
    setSlice(newSlice);
    setOcultos(ocultos - 3);
    const newList = fullList.slice(0, newSlice);
    setList(newList);
    setBtnLoading(false);
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
  console.log(list);
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
                <Text style={styles.comentarioNome}>
                  {comentario.fromUser.name}
                </Text>
                <RateStars nota={comentario.rate} />
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
