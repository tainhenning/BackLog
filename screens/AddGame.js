import React, { Component } from 'react';
import { Alert, AppRegistry, TextInput, View, Button } from 'react-native';
import * as firebase from 'firebase';


export default class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebaseApp.database().ref();
    this.state = { title: "Enter a game title", year: "Enter the year of the game" };
  }
  sumbitButton(){
    Alert.alert('Sumbit');
  }
  render() {
    return (
      <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({title: text})}
        value={this.state.title}
      />

      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({year: text})}
        value={this.state.year}
      />

      <Button
        onPress = {this.sumbitButton}
        title="Add"
        color="#841584"
      />

      </View>
    );
  }
}