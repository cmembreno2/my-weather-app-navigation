import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SearchCity from './src/screens/SearchCity';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home',headerRight: () => (
            <Button
              onPress={() => alert('Starter project with React Native')}
              title="Info"
              color="#000000"
            />
          ), }}/>
        <Stack.Screen name="SearchCity" component={SearchCity} options={{ title: 'World Weather', headerRight:()=>(
          <Button
              onPress={() => alert('In the input search bar please type the city you want to know weather info then tap search')}
              title="Help"
              color="#000000"
            />
        ),}}/>    
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
