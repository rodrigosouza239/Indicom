import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCCCCC',
    height: 150,
    alignItems: 'center',
  },
  fotoContainer: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const DetalheFoto = ({ images }) => {
  const renderItem = (item) => {
    return (
      <View
        style={{
          height: '100%',
        }}
      >
        <Image source={{ uri: item.item.imageUrl }} style={styles.image} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.fotoContainer}>
        {images.length === 0 ? (
          <Text style={styles.title}>SEM FOTO</Text>
        ) : (
          <Carousel
            keyExtractor={(item) => item.imageUrl}
            renderItem={renderItem}
            data={images}
            loop={false}
            itemWidth={202}
            sliderWidth={300}
          />
        )}
      </View>
    </View>
  );
};

export default DetalheFoto;
