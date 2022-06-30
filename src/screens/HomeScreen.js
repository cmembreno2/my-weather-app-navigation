import React from 'react';
import {Text,StyleSheet,View, ImageBackground,Button} from 'react-native';
import getImageForWeather from '../../utils/getImageForWeather';

const HomeScreen = ({navigation})=>{
    return (
            <View style={styles.container}>
             <ImageBackground
                source={getImageForWeather('Start')}
                style={styles.imageContainer}
                imageStyle={styles.image}
            >
            <Text style={styles.text}>Welcome to My Weather App</Text>
            <Button
                onPress={()=>navigation.navigate('SearchCity')}
                title="Start searching"
            />
            </ImageBackground>
        </View>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    text:{
        fontSize:30,
        textAlign: 'center',
        color: "#ffffff"
    },
    imageContainer:{
        flex: 1,
    },
    image:{
        flex:1,
        width: null,
        height: null,
        resizeMode: 'cover',
     }
});

export default HomeScreen;