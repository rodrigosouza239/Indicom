import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useNavigation } from '@react-navigation/native';

import ExampleImage from '../../../../assets/img/example-offer.png';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
  content: {
    fontSize: 13,
  },
  horas: {
    fontSize: 11,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

const OfertaCard = ({ oferta }) => {
  const navigation = useNavigation();
  if (oferta.images.length > 0) {
    console.log(oferta.images[0].imageUrl);
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('OfertaDetalhes', { oferta })}
    >
      <View style={styles.container}>
        {oferta.images.length === 0 ? (
          <Image source={ExampleImage} />
        ) : (
          <Image
            source={{ uri: oferta.images[0].imageUrl }}
            style={styles.image}
          />
        )}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{oferta.title}</Text>
          <Text style={styles.content}>{oferta.description}</Text>
          <Text style={styles.horas}>
            {moment(oferta.createdAt).format('LL')}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OfertaCard;
