import * as React from "react";
import {View, Text, TouchableOpacity} from "react-native";

export default class Detailsscreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            details:{},
            imagePath:"",
            url:'http://127.0.0.1:5000/planet?name='+this.props.navigation.getParam('planet_name')
        }
    }
    componentDidMount() {
        this.getDetails();
    }
    setDetails=(planetDetails)=>{
        const PlanetType=planetDetails.planet_type;
        let imagePath=""
        switch(planet_type){
            case "Gas Giant":
                imagePath=require("../assets/gas_giant.png")
            case "Terrestial":
                imagePath=require("../assets/terrestial.png")
            case "Super Earth":
                imagePath=require("../assets/super_earth.png")
            case "Neptune Like":
                imagePath=require("../assets/neptune_like.png")
            default:
                imagePath=require("../assets/super_earth.png")
        }
        this.setState({
            details:planetDetails,
            imagePath:imagePath
        })
    }
    getDetails=()=>{
        const URL=this.state.url;
        axios
          .get(URL)
          .then(response=>{
              this.setDetails(response.data.data)
          })
          .catch(error=>{
              alert(error.message);
          })
    }
    render(){
        const { details, imagePath } = this.state;
        if (details.specifications) {
          return (
            <View>
              <Card
                title={details.name}
                image={imagePath}
                imageProps={{ resizeMode: "contain", width: "100%" }}
              >
                <View>
                  <Text
                    style={styles.cardItem}
                  >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Gravity : ${details.gravity}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Orbital Period : ${details.orbital_period}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Orbital Speed : ${details.orbital_speed}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Planet Mass : ${details.planet_mass}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Planet Radius : ${details.planet_radius}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Planet Type : ${details.planet_type}`}</Text>
                </View>
                <View style={[styles.cardItem, { flexDirection: "column" }]}>
                  <Text>{details.specifications ? `Specifications : ` : ""}</Text>
                  {details.specifications.map((item, index) => (
                    <Text key={index.toString()} style={{ marginLeft: 50 }}>
                      {item}
                    </Text>
                  ))}
                </View>
              </Card>
            </View>
          );
        }
        return null;
      }
    }
