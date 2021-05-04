import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FooterItem = ({ label, icon, onPress, active, countBadge }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    icon: {
      marginBottom: 3,
    },
    badge: {
      position: "absolute",
      left: "55%",
      top: -6,
      borderRadius: 20,
      height: 20,
      width: 20,
      color: "#fff",
      backgroundColor: "red",
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    badgeCount: {
      color: "white"
    },
    active: {
      backgroundColor: '#000',
      width: '70%',
      height: 3,
      marginTop: 3,
      borderRadius: 8,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {
          countBadge ? 
            <View style={styles.badge}><Text style={styles.badgeCount}>{countBadge < 10 ? countBadge : "9+"}</Text></View>
            :
            null
        }
        <Icon style={styles.icon} name={icon} solid size={20} color="#000" />
        <Text>{label}</Text>
        {active === label && <View style={styles.active} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FooterItem;
