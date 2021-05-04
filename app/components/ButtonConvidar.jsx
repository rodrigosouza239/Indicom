import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 15,
  },
});

const Button = (props) => {
  const {
    label,
    customStyles,
    textColor,
    textWeigth,
    fontSize,
    onPress,
    disabled,
    loading,
    loadingStyle,
  } = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          ...styles.wrapper,
          ...customStyles,
          opacity: disabled ? 0.3 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator {...loadingStyle} />
        ) : (
          <Text
            style={{
              fontSize: fontSize || 14,
              color: textColor || '#fff',
              fontWeight: textWeigth || 'normal',
              textAlign: 'center',
            }}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Button;
