import React from 'react'
import {Text, SafeAreaView, TextInput, View,TouchableOpacity,ScrollView } from 'react-native';

import { styled } from 'nativewind';

const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)
const StyledTouchableOp=styled(TouchableOpacity)

const Notesrender = (props) => {
    // console.log(props.index)
    console.log(props,"haha")
  return (
    <View className=' mt-4 w-[20vh] h-40 ml-1 break-normal bg-fuchsia-500 rounded'>
  <StyledTouchableOp onPress={()=>{console.log("Harsh")}}>
      <StyledText className= ' w-[19vh]   text-black text-center'>{props.value.Heading}</StyledText>
      </StyledTouchableOp>
      
      <Text className=' text-black  line-through'>-------------------------------------</Text>
      <ScrollView  onAccessibilityTap={()=>{console.log("Harsh")}} className= ' h-30  text-black  text-center '><Text>{props.value.Content}</Text></ScrollView>
      </View>
  // <Text className='text-black'>{props.value.Heading}</Text>
  
  )

}

export default Notesrender

