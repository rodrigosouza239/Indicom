import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Rating } from 'react-native-rating-element';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: "flex",
    alignItems: "center" 
  },
  rated: {
    color: '#FFD500',
    opacity: 1,
    marginRight: 1,
    borderColor: '#000',
    borderLeftWidth: 3,
  },
  notRated: {
    opacity: 0.1,
    marginRight: 1,
  },
  rate: {
    color: '#d4d4d4',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const RateStars = ({ nota }) => {
  return (
    <View style={styles.container}>
      <Rating
        rated={nota}
        totalCount={5}
        readonly
        icon="ios-star"
        size={18}
        marginBetweenRatingIcon={2}
      />
      <Text style={Object.assign({}, styles.rate, nota > 0 ? { color: "#FFD500"} : {})}>{nota}</Text>
    </View>
  );
};

export default RateStars;
