import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostScreen from './PostScreen';
import firebase from "firebase";

export default class PostCard extends Component {
  constructor(props){
    super(props);
    this.state={
      light_theme: true,
      post: this.props.post.key,
      post_data: this.props.post.value
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate('PostScreen', { post: this.props.post });
        }}>
        <View style={styles.container}>
          <View style={
            this.state.light_theme
            ? styles.cardContainerLight
            : styles.cardContainer
          }>
            <Image
              source={require('../assets/image_1.jpg')}
              style={styles.postImage}
            />
            <View style={styles.authorContainer}>
              <Text style={
                this.state.light_theme
                      ? styles.postAuthorTextLight
                      : styles.postAuthorText
              }>
                {this.props.post.author}
              </Text>
              <Text style={
                this.state.light_theme
                      ? styles.captionTextLight
                      : styles.captionText
              }>{this.props.post.caption}</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <View style={styles.likeButton}>
            <Ionicons name={'heart'} size={RFValue(30)} color={'white'} />
            <Text style={
              this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
            }>12k</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
  },
  cardContainerLight:{
    margin: RFValue(13),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    shadowColor:"rgb(0,0,0)",
    shadowOffset:{
      width:3,
      height:3
    }
  },
  postImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  authorContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  postAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  postAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black"
  },
  captionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "white"
  },
  captionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "black"
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
