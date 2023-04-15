import React, {useState, useLayoutEffect} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

function Signup({navigation}) {
    const [isLoading, setIsLoading] = useState(false)
    const [signupData,setSignupData]=useState({
        name:'',
        email:'',
        password:'',
        confpassword:''        
    })
    const [errormsg,setErrormsg]=useState("fill the fildes");


    const sendToBackend= async()=>{
        // console.log(signupData);
        setIsLoading(true)
        if(signupData.name==''||signupData.email==''||signupData.password==''){
            
            setErrormsg("Please Fill all the filds");
            setIsLoading(false)
            alert(errormsg)

        }
        else{
            if(signupData.password!=signupData.confpassword){
                
                setErrormsg("Password Not matched")
                setIsLoading(false)
                alert(errormsg)
            }
            else{
                try{
                    await fetch('http://192.168.114.181:3000/signup',{
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(signupData)
    
                    })
                        .then(res=>res.json()).then(
                            data=>{
                                console.log(data);
                                if(data.error){

                                    setErrormsg(data.error)
                                    setIsLoading(false)
                                    alert(errormsg)
                                }
                                else{
                                    setIsLoading(false)
                                    alert("Account create Succusfully")
                                    navigation.pop();
                                }
                            }
                        ) 
                }
                catch(err){
                    setIsLoading(false)
                    console.log(err,"This is error")
                }
                
            }

         }
         
    }

        


    

    return (
        isLoading?<>
        <View className='flex-1 justify-center flex-row  p-3'>
    
    <ActivityIndicator size="large" />
    
  </View>
        </>:
        <SafeAreaView className="flex-1 items-center justify-center m-4">
            <TextInput value={signupData.name}
                className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-4 text-black"
                placeholder="Enter the Name"
                placeholderTextColor={"black"}
                onChangeText={
                    name => setSignupData({...signupData,name})
            }></TextInput>

            <TextInput value={signupData.email}
                className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-4 text-black"
                placeholder="Enter the Email"
                placeholderTextColor={"black"}
                onChangeText={
                    email => setSignupData({...signupData,email})
            }></TextInput>
            <TextInput value={signupData.password}
                secureTextEntry={true}
                className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-4 text-black"
                placeholder="Enter the Password"
                placeholderTextColor={"black"}
                onChangeText={
                    password => setSignupData({...signupData,password})
            }></TextInput>

            <TextInput value={signupData.confpassword}
                secureTextEntry={true}
                className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-4 text-black"
                placeholder="confirm Password"
                placeholderTextColor={"black"}
                onChangeText={
                    confpassword => setSignupData({...signupData,confpassword})
            }></TextInput>

            
            


            <TouchableOpacity className='h-10 w-28  rounded-lg bg-[#62CDFF] items-center justify-center mb-4 text-black '
                onPress={
                    () => {sendToBackend()}
            }>
                <Text className='font-bold text-black '>SignUp</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={
                () => {
                    navigation.navigate("Login")
                }
            }>
                <Text className='text-black'>Already Have Account</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default Signup
