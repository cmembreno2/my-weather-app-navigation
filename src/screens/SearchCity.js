import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ImageBackground, Text, KeyboardAvoidingView , Platform, ActivityIndicator} from 'react-native';
import getImageForWeather from '../../utils/getImageForWeather';
import SearchInput from '../components/SearchInput';

export default class App extends React.Component{

  state={
      loading: false,
      location: '',
      temperature: 0,
      weather: 'Start',
      error:false,
      start: true,
      cityExist: true,
  };
  
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
            console.log(this.state)
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
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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