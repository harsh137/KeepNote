import React ,{useState,useEffect} from 'react';
import {Text, SafeAreaView, View, TextInput,TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';




function Login({navigation}) {
  const  [userName,setUserName]=useState("");
  const  [userPassword,setUserPassword]=useState("");

  
  useEffect( () => {

    async function fetchData() {
     
      // console.log("hahahahahah")
      await AsyncStorage.getItem("user")!=null?navigation.navigate("Home"):navigation.navigate("Login");
      // await AsyncStorage.getItem("user")!=null?console.log(JSON.parse( await AsyncStorage.getItem("user"))):console.log(JSON.parse( await AsyncStorage.getItem("user")));
     
    }
    fetchData()
   
  }, []);


  

  const loginVerification=async() =>{

    if(userName=="Harsh"&& userPassword=="Harsh"){
      AsyncStorage.setItem('user', JSON.stringify(userName))
      console.log(JSON.parse( await AsyncStorage.getItem("user")))
      navigation.navigate("Home")
      
      
    }
    else{
      alert("Enter the correct Id")
    }
  }

  
  

 

  return (
    <SafeAreaView className="flex-1 items-center justify-center m-4">
      <TextInput
        className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-4 text-black"

        placeholder="Enter the Username" placeholderTextColor={"black"}

        onChangeText={userName => setUserName(userName)}></TextInput>

        <TextInput
        className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-6 text-black"

        placeholder="Enter the Password" placeholderTextColor={"black"} 

        onChangeText={userPassword => setUserPassword(userPassword)}></TextInput>


        <TouchableOpacity className='h-10 w-28  rounded-lg bg-[#62CDFF] items-center justify-center mb-4  '
        onPress={
          () =>{loginVerification()}
          }
       >
          <Text className='font-bold text-black '>LOGIN</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={
          () =>navigation.navigate("Signup")
          }>
          <Text className='text-black'>Dont't Have Account</Text>
        </TouchableOpacity >

        
          
            

    </SafeAreaView>
  );
};

export default Login;
