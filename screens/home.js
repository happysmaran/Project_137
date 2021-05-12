import * as React from "react";
import {View, Text, TouchableOpacity, FlatList} from "react-native";
import {ListItem} from 'react-native-elements';
import axios from 'axios';

export default class Homescreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listData:[],
            url:'http://127.0.0.1:5000'
        }
    }
    componentDidMount(){
        this.getPlanets();
    }
    getPlanets=()=>{
        const URL=this.state.url;
        axios
          .get(URL)
          .then(response=>{
              return this.setState({
                  listData:response.data.data
              })
          })
          .catch(error=>{
              alert(error.message);
          })
    }
    renderItem=({item, index})=>{
        <ListItem 
            key={index}
            title={"planet:"+item.name}
            subtitle={"distanceFromEarth:"+item.distance_from_earth}
            bottomDivider
            onPress={()=>{
                this.props.navigation.navigate("Details", {planet_name:item.name})
            }}
        />
    }
    keyExtractor=(item, index)=>index.toString()
    render(){
        return(
            <View>
                <View>
                    <Text>Exoplanety</Text>
                </View>
                <View>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.listData}
                        renderItem={this.renderItem}
                    ></FlatList>
                </View>
            </View>
        )
    }
}
