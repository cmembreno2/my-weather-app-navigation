import React from 'react';
import {StyleSheet,View,ImageBackground} from 'react-native';
import getImageForWeather from '../../utils/getImageForWeather';

export default function Cards(props){
    return(
        <View style={styles.card}>
            <ImageBackground
          source={getImageForWeather(props._weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation:3,
        backgroudColor: '#ffffff',
        shadowOffset:{width:1, height:1},
        shadowColor: '#333',
        shadowOpacity: '0.3',
        shadowRadius: 2,
        marginHorizontal:4,
        marginVertical:6,
        flex:1
    },
    cardContent:{
        marginHorizontal:18,
        marginVertical: 10
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