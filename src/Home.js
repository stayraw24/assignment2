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
  Header,
  Alert,
  Modal,
  ActivityIndicator,
  FlatList,
  SectionList,
  StatusBar,
  RefreshControl,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import Detail from './Detail';


export default class Home extends Component{

  static navigationOptions = {
      header:null
  };
    constructor(props){
    super(props);

    this.state={
      isLoading: true,
      dataSource:[],
    };
    this.arrayholder=[];
  }

  componentDidMount () {
    console.log("started");
    console.log(this.state);
    var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=in&' +
          'category=general&' +
          'apiKey=39d7ec10bd874b6c9333b8b4fe88f949';
    var req = new Request(url);

    fetch(req)
    .then ((response) => response.json())
    .then ((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson.articles 
      },
      function(){this.arrayholder=responseJson.articles})
      console.log(responseJson);
      
    })
 }

 onRefresh()
  {
    this.setState({dataSource:[]});
    this.componentDidMount();

  } 

    SearchFunction(text){
    const newData=this.arrayholder.filter(function(item){
    const itemData =item.title ? 
    item.title.toUpperCase(): ''.toUpperCase();
    const textData =text.toUpperCase();
    return itemData.indexOf(textData)> -1;
  });
  this.setState(
  {
    dataSource:newData,
    text:text,
  });
 }

_onPress=(item)=>{
    this.props.navigation.navigate('Detail',
      {
        ititle:item.title,
        iimage:item.urlToImage,
        idesc:item.description,
        ipublished:item.publishedAt,
        icontent:item.content,
        iurl:item.url,
        iauthor:item.author
      });
}
  _renderItem = ({item,index}) => {
    return(
      <View style={styles.cards}> 
      <StatusBar barStyle='light-content' backgroundColor='black'/>
      <TouchableOpacity onPress={()=>this._onPress(item)}>
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
              <View style={{width:100}}>
              <Image source={{ uri:item.urlToImage }} style={styles.img}/>
              </View>
              <View style={{flex:1,margin:10,flexDirection:'column'}}>
              <Text style={{fontWeight:'bold'}} numberOfLines={2}>{item.title}</Text>
              <Text numberOfLines={2}>{item.description}</Text>
              </View>
              <View style={{alignSelf:'center'}}>
              <Text>View</Text>
              </View>
            </View>
      </TouchableOpacity>
      </View>
      

      );
  }



  render() {
    let {dataSource, isLoading} =this.state;
    //console.log(this.state);
    return (
      <SafeAreaView style={{backgroundColor:'white'}}>
       <View style={{backgroundColor:'white'}}>
            <StatusBar backgroundColor='black' barStyle='light-content'/>
            <TextInput
            style={styles.Search}
            onChangeText={text=>this.SearchFunction(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
            />
            
            {
              this.state.isLoading ? 
              <ActivityIndicator style={{marginTop:200,alignSelf:'center'}} animating={this.state.isLoading}/>
            :
            <FlatList
            data ={dataSource}
            renderItem ={this._renderItem.bind(this)}
            keyExtractor={(item,index) => index.toString()}
            refreshControl={
              <RefreshControl
               refreshing={this.state.isLoading}
               onRefresh={this.onRefresh.bind(this)}
              />
              } 
            />
            }
        </View>
        </SafeAreaView>
      );
  }
  }


const styles = StyleSheet.create({

  cards: {
    flex:1,
    flexDirection:'column',
    margin: 10,
    backgroundColor:"white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
  img:{
    height: 100,
    width:50,
    borderRadius:50, 
    width: null,
    flex:1
  }
});
