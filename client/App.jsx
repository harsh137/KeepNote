

import React ,{useState,useEffect} from 'react';
import {Text, SafeAreaView, View, TextInput,TouchableOpacity ,Button,Image} from 'react-native';
import { Icon } from '@rneui/themed';
import Login from './screens/login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './screens/singup/Signup';
import Home from './screens/home/Home';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from '@react-native-async-storage/async-storage';





const Stack = createNativeStackNavigator();


function App() {
  const [id,setId]=useState(null)

  async function getIsSignedIn() {
    // custom logic
    
  await AsyncStorage.getItem("user") != null ? setId(true):setId(false)
  console.log(id)
  return id
  };
  
   
  const isSignedIn = getIsSignedIn();
  
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
          {isSignedIn?
          <>
          <Stack.Screen name="Home" component={Home} /> 
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
          </>
          :
          <>
          
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component={Home} /> 
          </>}
          
          
          
          
          {/* <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          :  <Stack.Screen name="Home" component={Home} options={{headerLeft: () => (<></>)}}>  </Stack.Screen>}
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/> */}
       
        
        
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App;
