import React from 'react'
import {Text, SafeAreaView, TextInput, View,TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import { styled } from 'nativewind';

const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)
const StyledTouchableOp=styled(TouchableOpacity)

const Notesrender = (props) => {
    console.log(props.index)
    console.log(props)
  return (
    
  <StyledTouchableOp className= ' flex-none text-center h-auto w-2/5 m-2 justify-center items-center text-white bg-fuchsia-500 rounded '  onLongPress={()=>{}}>
      <StyledText className='text-black text-center'>{props.value.heading}</StyledText>
      <Text className='text-black line-through'>-------------------------------------</Text>
      <StyledTextInput editable={false} multiline={true} className='text-black  text-center '>{props.value.content}</StyledTextInput>
  </StyledTouchableOp>
  
  )

}

export default Notesrender

