import React ,{useState,useLayoutEffect} from 'react';
import {Text, SafeAreaView, View, TextInput,TouchableOpacity} from 'react-native';

function Signup({navigation }){
  const  [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("")
    
  return (
    <SafeAreaView className="flex-1 items-center justify-center m-4">
 <TextInput
        className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-4 text-black"

        placeholder="Enter the Username" placeholderTextColor={"black"}

        onChangeText={name => setName(name)}></TextInput>
         <TextInput
        className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-4 text-black"

        placeholder="Enter the Username" placeholderTextColor={"black"}

        onChangeText={email => setEmail(email)}></TextInput>
         <TextInput
        className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-4 text-black"

        placeholder="Enter the Username" placeholderTextColor={"black"}

        onChangeText={confPassword => setPassword(confPassword)}></TextInput>
         


        <TouchableOpacity className='h-10 w-28  rounded-lg bg-[#62CDFF] items-center justify-center mb-4 text-black '
        onPress={()=>navigation.pop()}
        >
          <Text className='font-bold text-black '>SignUp</Text>

        </TouchableOpacity>
        <Text>name</Text>

        

    </SafeAreaView>
  )
}

export default Signup
