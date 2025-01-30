import React from 'react';
import '@react-native-firebase/app';  
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import PatternPrinting from './PatternPrinting';
import ArrayMethods from './ArrayMethods';
import SortingScreen from './SortingScreen';
import Matrix from './Matrix';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Matrix">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='PatternPrinting' component={PatternPrinting}/>
        <Stack.Screen name='ArrayMethods' component={ArrayMethods}/>
        <Stack.Screen name='SortingScreen' component={SortingScreen}/>
        <Stack.Screen name='Matrix' component={Matrix}/>
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
