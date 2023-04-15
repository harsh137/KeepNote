
import React, { useEffect, useState } from 'react'
import {Text, SafeAreaView, TextInput, View,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind';



const StyledView = styled(View)
function Home (navigation) {
  const url="192.168.141.181:3000"

  const [allNotes, setAllNotes]=useState([]);
 

  

  useEffect(()=>{
  
    const FetchNotes= async ()=>{
      const id=JSON.parse(  await AsyncStorage.getItem("user"))
      console.log(id,'ha')
      try{
       await fetch (`http://${url}/FetchNotes/${id}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            }, 
            
           
        }).then(res=> res.json()).then(data => {
          console.log(data.notes)
          setAllNotes(data.notes)
        })  

    }
    catch(e){
      console.log(e)
    }
  }
    
    FetchNotes()
    
    
    
  },[])

  const [Notes,setNotes]=useState({
    id:0,
    ContTemp:"",
    HeadTemp:""
  })

  

 

  const check=()=>{
   
    
    Notes.HeadTemp.length==0 || Notes.ContTemp.length==0 ? alert("Enter the NoteHead And NoteContent Both"):saveNotes()
  }

  const makeEmpty=()=>{
    setNotes({
      ContTemp:"",
      HeadTemp:""
    });
  }

  const saveNotes= async ()=>{

    // console.log(Notes, "  hahahahahahahahaha")
    NotesObj={
      
      Content:Notes.ContTemp,
      Heading:Notes.HeadTemp,
      user_id:JSON.parse( await AsyncStorage.getItem("user"))
      
    }
    console.log(NotesObj,"hahah")
  
    try{
      await fetch(`http://${url}/saveNotes`,{
          method:'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(NotesObj)

      })
          .then(res=>res.json()).then(
              data=>{
                  console.log(data);
                  if(data.error){

                      // setErrormsg(data.error)
                      // setIsLoading(false)
                      alert(data.error)
                  }
                  else{
                      if(data.message==="Notes Saved Successfully"){
                        alert("Notes Saved Successfully")
                      }
                  }
              }
          ) 
  }
  catch(err){
      // setIsLoading(false)
      console.log(err,"This is error")
  }
  setAllNotes((prevNotes)=>{
    return [...prevNotes, NotesObj];
  });
    // console.log(allNotes, " bababzbzbb")
    makeEmpty();
    
  }
    const Logout= async ()=>{
    await AsyncStorage.removeItem("user");
    console.log(JSON.parse( await AsyncStorage.getItem("user")))
    navigation.navigation.navigate("Login")
  }
  const handleDeleteNote = (_id) => {
    setAllNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
  };

  const renderItem = ({ item }) => (
    <View className='w-1/2 p-4'>
      <View className='bg-white rounded-lg shadow-lg p-4'>
        <Text className='text-lg font-bold mb-2 text-gray-800'>{item.Heading}</Text>
        <Text className='text-gray-600 mb-4'>{item.Content}</Text>
        <View className='flex-row justify-between items-center'>
        
          <TouchableOpacity className='bg-slate-500 rounded-full w-5 h-5 -ml-3' 
      onPress={() => handleDeleteNote(item._id)}><Text className='text-xl text-center '>-</Text></TouchableOpacity>
          
          <TouchableOpacity className='bg-slate-500 rounded-full w-5 h-5 -ml-3' 
      onPress={() => handleDeleteNote(item._id)}><Text className='text-xl text-center '>E</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className=' p-4  items-center'>
      <StyledView className='m-auto bg-slate-300 w-[40vh] shadow-2xl shadow-gray-700 rounded-lg '>
        <TextInput value={Notes.HeadTemp} name="Heading" placeholder='Enter the Title' placeholderTextColor={"black"} className=' w-full text-black  ' onChangeText={HeadTemp=>setNotes({...Notes,HeadTemp})}></TextInput>
        <TextInput value={Notes.ContTemp} name="Content"  placeholder='Enter the Content' placeholderTextColor={"black"} className=' text-black w-3/4 ' onChangeText={ContTemp =>setNotes({...Notes,ContTemp})}
         multiline={true}
    numberOfLines={4}  
    ></TextInput>
      <TouchableOpacity className='bg-slate-500 rounded-full w-10 h-10 absolute bottom-2 ml-2 left-3/4 ' 
      onPress={check  }><Text className='text-4xl text-center '>+</Text></TouchableOpacity>
      </StyledView> 


<FlatList 
      data={allNotes}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
      contentContainerStyle={className='p-4'}
     
    />
        
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

