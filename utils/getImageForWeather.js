/* eslint-disable global-require */

const images = {
  Rain: require('../assets/heavy-rain.png'),
  Clear: require('../assets/clear.png'),
  Thunderstorm: require('../assets/thunder.png'),
  Clouds: require('../assets/heavy-cloud.png'),
  Snow: require('../assets/snow.png'),
  Drizzle: require('../assets/showers.png'),
  Haze: require('../assets/light-cloud.png'),
  Mist: require('../assets/light-cloud.png') , 
  Start: require('../assets/startScreen.jpg'),
  error: require('../assets/error.png')  
};

export default weather => images[weather];
