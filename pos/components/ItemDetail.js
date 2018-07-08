import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  TextInput
} from 'react-native';
import firebase from 'firebase';
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
  onUpload = () => {
    const { drink, price } = this.state;
    firebase
      .database()
      .ref(`Funtime Bar/${this.props.data.info.name}/tab`)
      .push({ drink, price });
    this.setState({ items: [...this.state.items, { drink, price }] });
    this.setState({ drink: '', price: '' });
  };
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

        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <Card>
                  <CardSection>
                    <View style={thumbnailContainerStyle}>
                      <Image
                        style={{ width: 80, height: 80 }}
                        source={{ uri: this.props.data.info.picture }}
                      />
                    </View>

                    <View style={headerContentStyle}>
                      <Text style={headerTextStyle}>
                        {this.props.data.info.name}
                      </Text>
                      <Text>{this.props.data.info.customerNum}</Text>
                    </View>
                  </CardSection>
                  <CardSection>
                    <FlatList
                      style={{ flex: 1 }}
                      data={this.state.items}
                      renderItem={({ item }) => <TabItem data={item} />}
                    />
                  </CardSection>

                  <TextInput
                    placeholder="Drink"
                    style={styles.input}
                    onChangeText={drink => this.setState({ drink })}
                    value={this.state.drink}
                    returnKeyType="next"
                    onSubmitEditing={() => this.priceInput.focus()}
                  />
                  <TextInput
                    placeholder="Price"
                    style={styles.input}
                    onChangeText={price => this.setState({ price })}
                    value={this.state.price}
                    ref={inputs => (this.priceInput = inputs)}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                      this.onUpload();
                    }}
                  >
                    <Text style={styles.buttonText}>Add Drink</Text>
                  </TouchableOpacity>

                  <CardSection>
                    <Button
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    >
                      Close Modal
                    </Button>
                  </CardSection>
                </Card>
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
    color: 'black',
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
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 12
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18
  }
};
export default ItemDetail;
