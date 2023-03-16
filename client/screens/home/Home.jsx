
import React, { useState } from 'react'
import {Text, SafeAreaView, TextInput, View,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind';
import Notesrender from '../../components/Notesrender';
const StyledView = styled(View)

function Home (navigation) {

 
  const [HeadTemp,setHeadTemp]=useState("");
  const [ContTemp,setContTemp]=useState("");

  const [allNotes, setAllNotes]=useState([]);

 

  const check=()=>{
    HeadTemp.length==0 && ContTemp.length==0 ? alert("Enter the NoteHead And NoteContent Both"):saveNotes()
  }

  const saveNotes=()=>{
    const NoteObject={
      heading:HeadTemp, 
      content:ContTemp
    };
    // console.log(NoteObject)
    setAllNotes((prevNotes)=>{
      return [...prevNotes, NoteObject];
    });
    setHeadTemp("");
    setContTemp("");
    // console.log(allNotes)
  }
    const Logout= async ()=>{
    await AsyncStorage.removeItem("user");
    console.log(JSON.parse( await AsyncStorage.getItem("user")))
    navigation.navigation.navigate("Login")
  }

  return (
    <View className='p-4  items-center'>
      <StyledView className='m-auto bg-slate-300 w-[40vh] shadow-2xl shadow-gray-700 rounded-lg '>
        <TextInput value={HeadTemp} name="Heading" placeholder='Enter the Title' placeholderTextColor={"black"} className=' text-slate-800 w-full  ' onChangeText={heading=>setHeadTemp(heading)}></TextInput>
        <TextInput value={ContTemp} name="Content"  placeholder='Enter the Content' placeholderTextColor={"black"} className=' text-black w-3/4 ' onChangeText={content =>setContTemp(content)}
         multiline={true}
    numberOfLines={4}  
    ></TextInput>
      <TouchableOpacity className='bg-slate-500 rounded-full w-10 h-10 absolute bottom-2 ml-2 left-3/4 ' 
      onPress={check}><Text className='text-4xl text-center '>+</Text></TouchableOpacity>
      </StyledView> 
      

      <ScrollView className='theme.item mt-10 w-full  bg-slate-50' >
      {allNotes.map((value ,index)=>{
        return(
          
        <Notesrender key={index} index={index} value={value}/>
    
        )
        
        })}
        </ScrollView>
        
     <TouchableOpacity className='h-10 w-28  rounded-lg bg-[#62CDFF] items-center justify-center mb-4 mt-4 '
        onPress={
          () =>{Logout()}
          }>
             <Text className='font-bold text-black '>Logout</Text>
          </TouchableOpacity>
    </View>
  )
}

export default Home

