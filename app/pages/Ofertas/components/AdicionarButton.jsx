import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DB4437',
    opacity: 0.8,
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 101,
    bottom: 90,
    left: Dimensions.get('window').width - 70,
  },
});

const AdicionarButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('AdicionarOferta')}
    >
      <View style={styles.container}>
        <Icon name="plus" size={30} color="#FFF" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AdicionarButton;
