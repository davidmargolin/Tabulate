import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput
} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import Header from './Header';
import TabItem from './TabItem';

class ItemDetail extends React.Component {
  state = {
    modalVisible: false,
    items: [],
    drink: '',
    price: ''
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    let result = this.props.data.tab;
    let list = [];
    for (let row of Object.keys(result)) {
      list.push(result[row]);
    }
    this.setState({ items: list });
    //console.log(list);
  }
  render() {
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle
    } = styles;
    return (
      <View style={styles.cardStyle}>
        <View style={styles.cardSection}>
          <View style={{ flex: 1 }}>
            <Text style={headerTextStyle}>{this.props.data.info.name}</Text>
            <Text style={headerTextStyle}>
              {this.props.data.info.customerNum}
            </Text>
          </View>
        </View>
        <View style={styles.cardSection}>
          <Image
            style={styles.imageStyle}
            source={{ uri: this.props.data.info.picture }}
          />
        </View>
        <View style={styles.cardSection}>
          <Button
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            Table Detail
          </Button>
        </View>

        <View
          style={{
            marginTop: 22
          }}
        >
          <Modal
            animationType="fade"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <View
                style={{
                  margin: 100,
                  flex: 1
                }}
              >
                <View style={styles.cardSections}>
                  <View style={{ flex: 1 }}>
                    <View style={thumbnailContainerStyle}>
                      <Image
                        style={{ height: 90, width: 90 }}
                        source={{ uri: this.props.data.info.picture }}
                      />
                    </View>

                    <Text
                      style={{ fontSize: 25 }}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    >
                      {this.props.data.info.name}
                    </Text>

                    <Text style={{ fontSize: 25 }}>
                      {this.props.data.info.customerNum}
                    </Text>
                  </View>

                  <FlatList
                    style={{ flex: 1 }}
                    data={this.state.items}
                    renderItem={({ item }) => <TabItem data={item} />}
                  />
                </View>
                <TextInput placeholder="Drink Name" style={styles.input} />
                <TextInput placeholder="Price" style={styles.input} />
                <TouchableOpacity style={styles.joinContainer}>
                  <Text style={styles.joinText}>Add Drink</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = {
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
  },
  cardSection: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  cardSections: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    height: 800,
    width: 800
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    fontSize: 20
  },
  joinContainer: {
    paddingVertical: 12,
    marginBottom: 15
  },
  joinText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18
  }
};
export default ItemDetail;
