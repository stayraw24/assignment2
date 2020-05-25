/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  StatusBar,
  ActivityIndicator,
  FlatList,
  SectionList,
  TextInput,
  Image,
  TouchableOpacity,
  
  Button,
} from 'react-native';
import Home from './Home';


export default class Detail extends Component{

  constructor(props){
    super(props);
  }



  render(){
    const {ititle, idesc, iimage, icontent, ipublished,iurl,iauthor} =this.props.route.params;
    console.log(this.props);
    return(
      <View style={styles.cards}> 
      <ScrollView>
                  <Image source={{ uri:iimage}} style={{height:300, width:null, flex: 1}}/>
                  <Text style={{fontWeight:'bold',margin:20,fontSize:18}} numberOfLines={5}>{ititle}</Text>
                  <Text note numberOfLines={20} style={styles.txt}>Description: {idesc}</Text>
                  <Text note numberOfLines={10} style={styles.txt}>Content: {icontent}</Text>
                  <Text note numberOfLines={10} style={styles.txt}>Published At: {ipublished}</Text>
                  <Text note numberOfLines={10} style={styles.txt}>Url: {iurl}</Text>                  
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  cards: {
    flex:1,
    flexDirection:'column',
    backgroundColor:"white",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
  },
  desc: {
    fontSize: 15,
  },
  Search:{
    height:40,
    borderWidth:1,
    paddingLeft:10,
    margin:10,
    borderRadius:30
  },
  txt:{
    margin:20,
    fontSize:15,
  }
});

