import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notRated: {
    opacity: 0.1,
    marginRight: 5,
    marginLeft: 5,
  },
  rated: {
    color: '#FFD500',
    opacity: 1,
    marginRight: 5,
    marginLeft: 5,
  },
});

const Nota = ({ handleVoto }) => {
  const [nota, setNota] = useState(5);

  const votar = (voto) => {
    handleVoto(voto);
    setNota(voto);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => votar(1)}>
        <Icon
          name="star"
          size={25}
          solid
          style={nota > 0 ? styles.rated : styles.notRated}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => votar(2)}>
        <Icon
          name="star"
          size={25}
          solid
          style={nota > 1 ? styles.rated : styles.notRated}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => votar(3)}>
        <Icon
          name="star"
          size={25}
          solid
          style={nota > 2 ? styles.rated : styles.notRated}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => votar(4)}>
        <Icon
          name="star"
          size={25}
          solid
          style={nota > 3 ? styles.rated : styles.notRated}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => votar(5)}>
        <Icon
          name="star"
          size={25}
          solid
          style={nota > 4 ? styles.rated : styles.notRated}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Nota;
