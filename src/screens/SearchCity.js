import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ImageBackground, Text, KeyboardAvoidingView , Platform, ActivityIndicator,FlatList,TouchableOpacity} from 'react-native';
import getImageForWeather from '../../utils/getImageForWeather';
import SearchInput from '../components/SearchInput';
import Card from '../components/Cards';

export default class App extends React.Component{

  cities = [
        {name:'Ciudad de Guatemala',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'San Salvador',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Tegucigalpa',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Managua',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'San Jose',location:'',weather:'',temperature:0,feelsLike:''},
        {name: 'Panama',location:'',weather:'',temperature:0,feelsLike:''}
    ]

  state={
      loading: false,
      location: '',
      temperature: 0,
      weather: 'Start',
      error:false,
      start: true,
      cityExist: true,
  };

  componentDidMount() {
    this.cities.map((cities)=>{
      const API_KEY = '28643077d6936d2279056a7788fa22fc';

      try{
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cities.name}&appid=${API_KEY}&units=metric`
        )
          .then(res => res.json())
          .then(json => {
            console.log(json)
            elementIndex = this.cities.findIndex((obj => obj.name == cities.name));
            this.cities[elementIndex].location = json.name;
            this.cities[elementIndex].weather = json.weather[0].main;
            this.cities[elementIndex].temperature = json.main.temp;
            this.cities[elementIndex].feelsLike = json.main.feels_like;
          })
          .catch((e)=>{
            elementIndex = this.cities.findIndex((obj => obj.name == cities.name));
            this.cities[elementIndex].location = "";
            this.cities[elementIndex].weather = "";
            this.cities[elementIndex].temperature = 0;
            this.cities[elementIndex].feelsLike = "";
          });
      }catch(e){
        console.log(`Error fetching weather api: ${e}`)
    } 

    })
  }
  
  fetchWeather=(city)=> {

    const API_KEY = '28643077d6936d2279056a7788fa22fc';

    if(!city) return;

    this.setState({loading: true}) 
      try{
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
          .then(res => res.json())
          .then(json => {
            console.log(json)
            this.setState({
              temperature: json.main.temp,
              weather: json.weather[0].main,
              location: json.name,
              loading: false,
              error:false,
              feelsLike: json.main.feels_like,
              start: false,
              cityExist:true
            });
          })
          .catch((e)=>{
            this.setState({
              loading: false,
              error:true,
              start: true,
              cityExist: false,
              weather: 'error'
            });
          });
      }catch(e){
        this.setState({
          loading:false,
          error:true,
          start: false,
          cityExist: true,
          weather:'error'
        })
    } 
  }
  
  render(){

    const {location,temperature,weather,loading,error,feelsLike,start,cityExist} = this.state;

    return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <StatusBar barStyle="light-content"/>
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color = "white" size="large"/>

            {!loading && (
              <View>
                {error && (
                  <View>
                    {cityExist && (
                      <Text style={[styles.smallText, styles.textStyle]}>
                    Cound not load weather, please try a different city.
                      </Text>
                    )}
                    {!cityExist && (
                      <Text style={[styles.smallText, styles.textStyle]}>
                    City not found, please try a different city.
                      </Text>
                    )}
                  
                  </View>
                )}

                {!error && (
                  <View>
                    {start && (
                        <Text style={[styles.largeText, styles.textStyle]}>
                        LET'S START!
                        </Text>
                      )}


                    {!start && (
                      <>
                        <Text style={[styles.largeText, styles.textStyle]}>
                        {location}
                        </Text>
                        <Text style={[styles.smallText, styles.textStyle]}>
                          {weather}
                        </Text>
                        <Text style={[styles.largeText, styles.textStyle]}>
                          {temperature} °C
                        </Text>
                        <Text style={[styles.verySmallText, styles.textStyle]}>
                          Feels like: {feelsLike} °C
                        </Text>
                      </>
                    )}
                  </View>
                )}


            
                <SearchInput 
                  placeholder='Search any city' 
                  onSubmit={this.fetchWeather}
                />
              </View>
            )}
        </View>
      </ImageBackground>
      {!start && (
      <>
      <View style={styles.container}>
        <FlatList
          keyExtractor={friend=>friend.name}
          data={this.cities}
          renderItem={({item})=>(
            <TouchableOpacity>
              <Card>
              <Text style={[styles.largeText, styles.flatTextStyle]}>
                        {item.location}
              </Text>
              <Text style={[styles.smallText, styles.flatTextStyle]}>
                          {item.weather}
              </Text>
              <Text style={[styles.largeText, styles.flatTextStyle]}>
                          {item.temperature} °C
              </Text>
              <Text style={[styles.verySmallText, styles.flatTextStyle]}>
                          Feels like: {item.feelsLike} °C
              </Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
      </>
      )}
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {fontFamily: 'Roboto',
      },
    }),
    color: 'white',
  },
  flatTextStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {fontFamily: 'Roboto',
      },
    }),
    color: 'black',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
    },
  imageContainer:{
    flex: 1,
  },
  image:{
    flex:1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer:{
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  verySmallText: {
    fontSize: 14,
    }
});