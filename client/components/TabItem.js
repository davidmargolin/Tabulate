import React, { Component } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import CardSection from './helpers/CardSection';

export default TabDetail = ({ data }) => {
  const { drink, price } = data;
  return (
      <CardSection>

        <Image
          style={styles.thumbnailStyle}
          source={require('../images/cocktail.jpg')}
        />
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{drink}</Text>
          <Text style={styles.priceStyle}>${price}</Text>
        </View>
      </CardSection>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
    justifyContent: 'space-between'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    margin: 2
  },
  priceStyle: {
    fontSize: 18,
  }
};
