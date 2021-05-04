import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AuthContext from '../../contexts/auth';
import Api from '../../services/Api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Footer from '../../components/template/Footer';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    fontFamily: 'Montserrat',
  },
  body: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 15,
    height: 50,
  },
  textContainer: {
    marginTop: 15,
    height: 150,
  },
  imagensContainer: {
    marginTop: 15,
  },
  imagemSelectContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  imagemSelect: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ButtonContainer: {
    marginTop: 15,
  },
  headerTitleNoCredits: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 90,
    marginBottom: 10,
  },
});

const AdicionarOferta = () => {
  const { user, setUser, setLoading } = useContext(AuthContext);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

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

  const handleSubmit = async () => {
    const newOferta = {
      title,
      description,
      expireAt: date !== '' ? moment(date, 'DD-MM-YYYY').format() : '',
      userId: user.id,
      categories: user.activities.map((i) => i.id),
      images: [image1, image2, image3, image4, image5],
    };

    if (newOferta.categories.length === 0)
      return Alert.alert(
        'Atenção',
        'Para criar ofertas você precisa escolher pelo menos 1 interesse.'
      );
    if (title === '') return Alert.alert('Atenção', 'Título obrigatório');
    if (description === '')
      return Alert.alert('Atenção', 'Descrição obrigatória');
    if (date === '') return Alert.alert('Atenção', 'Validade obrigatória');
    setLoading(true);
    const response = await Api.post('v1/jobs/new', { ...newOferta });
    setLoading(false);
    if (response.status !== 201) {
      return Alert.alert('Atenção', 'Houve um erro no servidor');
    }
    setTitle('');
    setDate('');
    setDescription('');
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setImage5(null);
    setUser({ ...user, credits: user.credits - 5 });
    return navigation.navigate('OfertasEnviadas');
  };

  const createImage1 = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage1(result);
      }
    } catch (E) {
      console.log(E);
    }
  };
  const createImage2 = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage2(result);
      }
    } catch (E) {
      console.log(E);
    }
  };
  const createImage3 = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage3(result);
      }
    } catch (E) {
      console.log(E);
    }
  };
  const createImage4 = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage4(result);
      }
    } catch (E) {
      console.log(E);
    }
  };
  const createImage5 = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage5(result);
      }
    } catch (E) {
      console.log(E);
    }
  };

  if (user.credits < 5) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.body}>
          <Text style={styles.headerTitleNoCredits}>
            Você não tem créditos suficientes para esta operação
          </Text>
          <Button
            customStyles={{
              width: '60%',
              alignSelf: 'center',
              backgroundColor: '#00C068',
              marginTop: 25,
              marginBottom: 20,
            }}
            textColor="#FFF"
            label="Ir para Créditos"
            onPress={() => navigation.navigate('MeusCreditos')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        <ScrollView style={{ marginTop: 25 }}>
          <Text style={styles.headerTitle}>Nova Oferta</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Título da oferta:"
              onChangeText={(value) => setTitle(value)}
              value={title}
            />
          </View>
          <View style={styles.textContainer}>
            <Input
              placeholder="Descrição:"
              onChangeText={(value) => setDescription(value)}
              value={description}
              multiline
            />
          </View>
          <View style={styles.imagensContainer}>
            <Text>Imagens:</Text>
            <View style={styles.imagemSelectContainer}>
              <TouchableWithoutFeedback onPress={createImage1}>
                <View style={styles.imagemSelect}>
                  {image1 ? (
                    <Image source={image1} style={{ width: 50, height: 50 }} />
                  ) : (
                    <Icon name="plus" size={20} color="#CCCCCC" />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={createImage2}>
                <View style={styles.imagemSelect}>
                  {image2 ? (
                    <Image source={image2} style={{ width: 50, height: 50 }} />
                  ) : (
                    <Icon name="plus" size={20} color="#CCCCCC" />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={createImage3}>
                <View style={styles.imagemSelect}>
                  {image3 ? (
                    <Image source={image3} style={{ width: 50, height: 50 }} />
                  ) : (
                    <Icon name="plus" size={20} color="#CCCCCC" />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={createImage4}>
                <View style={styles.imagemSelect}>
                  {image4 ? (
                    <Image source={image4} style={{ width: 50, height: 50 }} />
                  ) : (
                    <Icon name="plus" size={20} color="#CCCCCC" />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={createImage5}>
                <View style={styles.imagemSelect}>
                  {image5 ? (
                    <Image source={image5} style={{ width: 50, height: 50 }} />
                  ) : (
                    <Icon name="plus" size={20} color="#CCCCCC" />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <DatePicker
              style={{ width: '100%', alignSelf: 'center' }}
              customStyles={{
                dateInput: {
                  backgroundColor: '#FFF',
                  alignItems: 'flex-start',
                  paddingLeft: 15,
                  borderColor: 'rgba(0, 0, 0, 0.25)',
                  borderRadius: 8,
                },
              }}
              is24Hour
              placeholder="Válido até:"
              mode="date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              minDate={moment().add(3, 'days').format('DD-MM-YYYY')}
              maxDate={moment().add(1, 'months').format('DD-MM-YYYY')}
              date={date}
              onDateChange={(value) => setDate(value)}
            />
          </View>
          <Button
            customStyles={{
              width: '60%',
              alignSelf: 'center',
              backgroundColor: '#00C068',
              marginTop: 25,
              marginBottom: 20,
            }}
            textColor="#FFF"
            label="Publicar"
            onPress={handleSubmit}
          />
        </ScrollView>
      </View>
      <Footer active="Ofertas" />
    </View>
  );
};

export default AdicionarOferta;
