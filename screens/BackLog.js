import React, { Component } from 'react';
import {StatusBar,StyleSheet,FlatList,Text,View} from 'react-native';
import * as firebase from 'firebase';
import BackLogGame from './BackLogGame';

const firebaseConfig = {
    apiKey: "AIzaSyAk6xmNqhwN-BfQd3hSoOgZrv8k35w1M8A",
    authDomain: "backlog-6bbd9.firebaseapp.com",
    databaseURL: "https://backlog-6bbd9.firebaseio.com",
    projectId: "backlog-6bbd9",
    storageBucket: "backlog-6bbd9.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class BackLog extends Component {
    constructor(props) {
        super(props);
        this.itemsRef = this.getRef().child('items');
        this.state = {items: []};
    }
    getRef()
    {
        return firebaseApp.database().ref();
    }
    componentWillMount()
    {
        this.getItems(this.itemsRef);
    }
    getItems(itemsRef)
    { 
        itemsRef.on('value', (snap) => {
            let newItems = [];
            let key = 1
            snap.forEach((child) => {
                key++;
                newItems.push({
                    id: child.val(),
                    title: child.val().title,
                    year: child.val().year,
                    thumbnail: child.val().thumbnail
                });
            });
            this.setState({items: newItems});
        });
    }

    keyExtractor = (item, index) => item.id.toString();
    renderItem = ({item}) => (
        <BackLogGame
            id={item.id}
            title={item.title}
            year={item.year}
            thumbnail={item.thumbnail}
            navigation={this.props.navigation}
        />
    );
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden = {true}
                />
                <FlatList
                    data={this.state.items}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});