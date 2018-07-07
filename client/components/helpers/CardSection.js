import React, { Component } from 'react';
import { View } from 'react-native';

const CardSection = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};
const styles = {
  containerStyle: {
    borderBottomWidth: 0.2,
    padding: 5,
    flexDirection: 'row',
    borderColor: '#ddd',
  }
};

export default CardSection;
