import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Homescreen from './screens/home';
import Detailsscreen from './screens/details';

export default class App extends React.Component {
  render(){
  }
}
const AppStackNavigator=createStackNavigator({
  Home:{
    screen:Homescreen
  },
  Details:{
    screen:Detailsscreen
  }
},
{
  initialRouteName:'Home'
});

const AppContainer=createAppContainer(AppStackNavigator);
//Requires Project C136 Flask Server to be running.