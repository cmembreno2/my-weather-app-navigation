/* eslint-disable global-require */

const images = {
  Rain: require('../assets/rainy.jpg'),
  Clear: require('../assets/new-clear.jpg'),
  Thunderstorm: require('../assets/thunder.png'),
  Clouds: require('../assets/heavy-cloud.png'),
  Snow: require('../assets/snow.png'),
  Drizzle: require('../assets/showers.png'),
  Haze: require('../assets/light-cloud.png'),
  Mist: require('../assets/misty.jpg') , 
  Start: require('../assets/startScreen.jpg'),
  error: require('../assets/error.png')  
};

export default weather => images[weather];
