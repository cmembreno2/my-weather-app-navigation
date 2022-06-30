import { StatusBar } from 'expo-status-bar';
import React , {useState,useEffect} from 'react';
import { StyleSheet, View, ImageBackground, Text, KeyboardAvoidingView , Platform, ActivityIndicator,FlatList} from 'react-native';
import getImageForWeather from '../../utils/getImageForWeather';
import SearchInput from '../components/SearchInput';
import Card from '../components/Cards';
import { weatherConditions } from '../../utils/weatherConditions';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const App = ()=>{
  const [loading,setLoading]=useState(false)
  const [location,setLocation]=useState('')
  const [temperature,setTemperature]=useState(0)
  const [weather,setWeather]=useState('Start')
  const [error,setError]=useState(false)
  const [start,setStart]=useState(true)
  const [cityExist,setCityExist]=useState(true)
  const [feelsLike,setFeelsLike]=useState('')
  const [cities]=useState([
        {name:'Alabama',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Alaska',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Arizona',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Arkansas',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'California',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'South Carolina',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'North Carolina',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Colorado',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Connecticut',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'North Dakota',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'South Dakota',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Delaware',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Florida',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Georgia',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Hawaii',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Idaho',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Illinois',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Indiana',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Iowa',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Kansas',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Kentucky',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Luisiana',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Maine',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Maryland',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Massachusetts',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Míchigan',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Minnesota',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Misisipi',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Misuri',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Montana',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Nebraska',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Nevada',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'New Jersey',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Nueva York',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'New Hampshire',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Nuevo México',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Ohio',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Oklahoma',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Oregón',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Pensilvania',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Rhode Island',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Tennessee',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Texas',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Utah',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Vermont',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Virginia',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Washington',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Wisconsin',location:'',weather:'',temperature:0,feelsLike:''},
        {name:'Wyoming',location:'',weather:'',temperature:0,feelsLike:''}
    ])

  useEffect(()=> {
    cities.map((city)=>{
      const API_KEY = '28643077d6936d2279056a7788fa22fc';

      try{
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`
        )
          .then(res => res.json())
          .then(json => {
            elementIndex = cities.findIndex(obj => obj.name == city.name);
            cities[elementIndex].location = json.name;
            cities[elementIndex].weather = json.weather[0].main;
            cities[elementIndex].temperature = json.main.temp;
            cities[elementIndex].feelsLike = json.main.feels_like;
          })
          .catch((e)=>{
            elementIndex = cities.findIndex(obj => obj.name == city.name);
            cities[elementIndex].location = "";
            cities[elementIndex].weather = "";
            cities[elementIndex].temperature = 0;
            cities[elementIndex].feelsLike = "";
          });
      }catch(e){
        console.log(`Error fetching weather api: ${e}`)
    } 

    })
  }, [])
  
  fetchWeather=(city)=> {

    const API_KEY = '28643077d6936d2279056a7788fa22fc';

    if(!city) return;

    setLoading(true) 
      try{
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
          .then(res => res.json())
          .then(json => {
            setTemperature(json.main.temp)
            setWeather(json.weather[0].main)
            setLocation(json.name)
            setLoading(false)
            setError(false)
            setFeelsLike(json.main.feels_like)
            setStart(false)
            setCityExist(true)
            
          })
          .catch((e)=>{
            setWeather('error')
            setLoading(false)
            setError(true)
            setStart(true)
            setCityExist(false)
          });
      }catch(e){
        setWeather('error')
        setLoading(false)
        setError(true)
        setStart(false)
        setCityExist(true)
    }
  }
  
    return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <StatusBar barStyle="light-content"/>
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <View>
            <SearchInput 
                          placeholder='Search any city' 
                          onSubmit={fetchWeather}
                />
            </View>
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
                        <MaterialCommunityIcons
                            size={40}
                            name={weatherConditions[weather].icon}
                            color={'#fff'}
                        />
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
                
              </View>
            )}
        </View>
      </ImageBackground>
      {!start && (
      <>
      <View style={styles.flatContainer}>
        <View>
          <Text style={styles.text}>USA Weather by State</Text>
        </View>
        <FlatList
         // keyExtractor={friend=>friend.name}
          data={cities}
          renderItem={({item})=>(
              <Card _weather={item.weather}>
              <Text style={[styles.flatSmallText, styles.flatTextStyle]}>
                        {item.location}
              </Text>
              <Text style={[styles.flatSmallText, styles.flatTextStyle]}>
                <MaterialCommunityIcons
                            size={20}
                            name={weatherConditions[item.weather].icon}
                            color={'#ffffff'}
                />
                          {item.weather}
              </Text>
              <Text style={[styles.flatSmallText, styles.flatTextStyle]}>
                          {item.temperature} °C
              </Text>
              <Text style={[styles.flatSmallText, styles.flatTextStyle]}>
                          Feels like: {item.feelsLike} °C
              </Text>
              </Card>
          )}
        />
      </View>
      </>
      )}
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  flatContainer: {
    flex:1,
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
    color: '#ffffff',
  },
  largeText: {
    fontSize: 30,
  },
  smallText: {
    fontSize: 20,
  },
  flatSmallText: {
    fontSize: 15,
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
    },
  text:{
        fontSize:20,
        textAlign: 'center',
        color: "#000000"
  }
});

export default App;