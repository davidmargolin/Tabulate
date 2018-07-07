import React, { Component } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './helpers/Card';
import CardSection from './helpers/CardSection';

const TabDetail = () => {
  return (
    <Card>
      <CardSection>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 10
          }}
        >
          <Image
            style={styles.thumbnailStyle}
            source={require('../images/cocktail.jpg')}
          />
        </View>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>CockTail</Text>
          <Text style={styles.priceStyle}>$9</Text>
        </View>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },

  imageStyle: {
    height: 300,
    flex: 1
  },
  priceStyle: {
    fontSize: 18,
    paddingHorizontal: 30
  }
};
export default TabDetail;
