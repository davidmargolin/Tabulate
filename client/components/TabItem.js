import React, { Component } from 'react';
import { Text, View, Image, Linking } from 'react-native';

export default TabDetail = ({ data }) => {
  const { drink, price } = data;
  return (
    <View style={styles.itemStyle}>

      <Image
        style={styles.thumbnailStyle}
        source={require('../images/cocktail.jpg')}
      />
      <View style={styles.headerContentStyle}>
        <Text style={styles.headerTextStyle}>{drink}</Text>
        <Text style={styles.priceStyle}>${Number.parseFloat(price).toFixed(2).toString()}</Text>
      </View>
    </View>
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
  },
  itemStyle: {
    borderBottomWidth: 0.2,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#ddd',
  }
};
