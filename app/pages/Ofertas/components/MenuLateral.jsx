import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const MenuLateral = ({ handleOpen, handleAction }) => {
  const [open, setOpen] = useState(handleOpen || false);
  const transition = useRef(new Animated.Value(-250)).current;
  const navigation = useNavigation();

  useEffect(() => {
    setOpen(handleOpen);
    Animated.timing(transition, {
      toValue: handleOpen ? 0 : -250,
      duration: 150,
    }).start();
  }, [handleOpen]);

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: Dimensions.get('window').width,
      height: '100%',
      paddingBottom: 60,
      zIndex: 100,
      position: 'absolute',
    },
    container: {
      backgroundColor: '#FFFEAB',
      width: 250,
      height: '100%',
      paddingTop: 50,
      paddingLeft: 10,
      position: 'relative',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    menuContainer: {
      paddingLeft: 10,
    },
    menuItem: {
      paddingTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuIcon: {
      paddingLeft: 5,
    },
    emptySpace: {
      flex: 1,
      height: Dimensions.get('window').height - 70,
    },
  });

  const handleLink = (page) => {
    handleAction(false);
    navigation.navigate(page);
  };

  if (!open) return <></>;

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.container,
          {
            left: transition,
          },
        ]}
      >
        <Text style={styles.title}>Ofertas</Text>
        <View style={styles.menuContainer}>
          <TouchableWithoutFeedback
            onPress={() => handleLink('OfertasRecebidas')}
          >
            <View style={styles.menuItem}>
              <Text>Ofertas Recebidas</Text>
              <Icon name="angle-right" size={20} style={styles.menuIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.menuContainer}>
          <TouchableWithoutFeedback
            onPress={() => handleLink('OfertasEnviadas')}
          >
            <View style={styles.menuItem}>
              <Text>Ofertas Enviadas</Text>
              <Icon name="angle-right" size={20} style={styles.menuIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.menuContainer}>
          <TouchableWithoutFeedback onPress={() => handleLink('MeusCreditos')}>
            <View style={styles.menuItem}>
              <Text>Meus Créditos</Text>
              <Icon name="angle-right" size={20} style={styles.menuIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
      <TouchableWithoutFeedback onPress={() => handleAction(false)}>
        <View style={styles.emptySpace} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MenuLateral;
