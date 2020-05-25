import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import Detail from './src/Detail';

const Stack = createStackNavigator();

function App() {
  return (

    <NavigationContainer>  
      <Stack.Navigator
      screenOptions={{
    //headerShown: false
  }}>	

  		<Stack.Screen name="Home" component={Home} options={{headerStyle:{backgroundColor:'black'},headerTitleStyle:{color:'white'}}}/>
      <Stack.Screen name="Detail" component={Detail} options={{headerShown:false}}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;


