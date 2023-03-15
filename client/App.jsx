

import React ,{useState,useEffect} from 'react';
import {Text, SafeAreaView, View, TextInput,TouchableOpacity ,Icon} from 'react-native';
import Login from './screens/login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './screens/singup/Signup';
import Home from './screens/home/Home';





const Stack = createNativeStackNavigator();

function App() {
  
  
   

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: 'yellow',
            
            
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          }

      }}>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerLeft: () => (<></>),headerRight: () => (<></>),headerTitleAlign: "left"}} />
        
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App;
