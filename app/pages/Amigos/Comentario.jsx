import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';
import Api from '../../services/Api';

import Button from '../../components/Button';
import Footer from '../../components/template/Footer';
import Nota from './components/Nota';

import UserIcon from '../../../assets/img/user-icon.png';

const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    fontFamily: 'Montserrat',
  },
  imageContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: 30,
  },
  iconImg: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
  },
  avaliar: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  avaliarText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  comentarioContainer: {
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
  },
  comentarioInput: {
    width: '100%',
    height: 150,
    backgroundColor: '#FFF',
    padding: 15,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 8,
  },
  caracteres: {
    paddingLeft: 10,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});

const Comentario = ({ route }) => {
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState(5);
  const { user, setLoading } = useContext(AuthContext);
  const { currentProfile } = route.params;
  const navigation = useNavigation();

  const handleChange = (value) => setComentario(value);

  const handleSubmit = async () => {
    const newComment = {
      fromUserId: user.id,
      toUserId: currentProfile.id,
      content: comentario,
      rate: nota,
    };
    setLoading(true);
    const response = await Api.post('v1/comments', { ...newComment });
    setLoading(false);
    if (response.status !== 201)
      return Alert.alert(
        'Erro',
        'Houve um erro ao se comunicar com o servidor, tente novamente mais tarde!'
      );

    return navigation.navigate('AmigosPerfil', { currentProfile, newComment });
  };

  return (
    <>
      <View style={Styles.wrapper}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          keyboardOpeningTime={0}
        >
          <View style={Styles.imageContainer}>
            <Image
              source={
                currentProfile.Image !== null
                  ? { uri: currentProfile.Image.imageUrl }
                  : UserIcon
              }
              resizeMethod="scale"
              style={Styles.iconImg}
            />
            <Text>{currentProfile.name}</Text>
          </View>
          <View style={Styles.avaliar}>
            <Text style={Styles.avaliarText}>Avaliar</Text>
            <Nota handleVoto={setNota} />
          </View>
          <View style={Styles.comentarioContainer}>
            <TextInput
              style={Styles.comentarioInput}
              multiline
              onChangeText={handleChange}
              placeholder="Escreve aqui seu comentário:"
              value={comentario}
            />
            <Text style={Styles.caracteres}>
              Restam {300 - comentario.length} caracteres.
            </Text>
            <Button
              customStyles={{
                alignSelf: 'center',
                backgroundColor: '#FFD500',
                marginTop: 20,
                width: '80%',
              }}
              disabled={comentario.length === 0}
              onPress={handleSubmit}
              maxLength="300"
              textColor="#000"
              label="Enviar Comentário"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Footer active="Amigos" />
    </>
  );
};

export default Comentario;
