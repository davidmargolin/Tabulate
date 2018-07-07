import React, { Component } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

import Header from './Header';
class ItemDetail extends React.Component {
  render() {
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle
    } = styles;
    return (
      <Card style={styles.viewContainer}>
        <Header />
        <CardSection>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{this.props.data.info.name}</Text>
            <Text style={headerTextStyle}>
              {this.props.data.info.customerNum}
            </Text>
          </View>
        </CardSection>

        <CardSection>
          <Image
            style={styles.imageStyle}
            source={{ uri: this.props.data.info.picture }}
          />
        </CardSection>

        <CardSection>
          <Button>Table Detail</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 22
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 400,
    flex: 1
  },
  viewContainer: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
};
export default ItemDetail;
