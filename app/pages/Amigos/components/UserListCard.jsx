/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import NoUser from '../../../../assets/img/user-icon.png';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImg: {
    marginRight: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nome: {
    fontSize: 16,
  },
  referencia: {
    fontSize: 12,
    color: 'rgb(120, 120, 120)',
  },
  perfil: {
    backgroundColor: '#E5E5E5',
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 3,
  },
});

const UserListCard = ({ user }) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('AmigosPerfil', { currentProfile: user })
      }
    >
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image
            style={styles.userImg}
            source={user.Image !== null ? { uri: user.Image.imageUrl } : NoUser}
          />
          <View>
            <Text style={styles.nome}>{user.name}</Text>
            <Text style={styles.referencia}>
              {user.type === 'PF'
                ? user.ActivityBranch
                  ? user.ActivityBranch.name
                  : ''
                : user.EconomicActivity
                ? user.EconomicActivity.name
                : ''}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('AmigosPerfil', { currentProfile: user })
          }
        >
          <View style={styles.perfil}>
            <Text>Perfil</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserListCard;
