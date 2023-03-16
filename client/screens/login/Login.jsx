import React, {useState, useEffect} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


function Login({navigation}) {
    // const  [userName,setUserName]=useState("");
    // const  [userPassword,setUserPassword]=useState("");
    const [loginData, setLoginData] = useState({email: '', password: ''})
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        async function fetchData() { // console.log("hahahahahah")
            await AsyncStorage.getItem("user") != null ? navigation.navigate("Home") : navigation.navigate("Login");
            // await AsyncStorage.getItem("user")!=null?console.log(JSON.parse( await AsyncStorage.getItem("user"))):console.log(JSON.parse( await AsyncStorage.getItem("user")));

        }fetchData()

    }, []);


    const sendtoBackend = async () => {
        setIsLoading(true);
        // console.log(loginData)
        if (loginData.email == "" || loginData.password == '') {
            setIsLoading(false);
            setError("All Fild Are Required");
            alert(error);

            return;
        } else {
            try {
                await fetch('http://192.168.29.195:3000/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                }).then(res  => res.json()).then(data => {

                    if (data.error) {
                        console.log(data, "If error")
                        setError(data.error)
                        setIsLoading(false)
                        alert(error)
                    } else {
                        console.log(data, 'if Logged in')
                        AsyncStorage.setItem('user', JSON.stringify(data.token))
                        // console.log(JSON.parse( await AsyncStorage.getItem("user")))
                        setLoginData({
                          email:'',
                          password:''
                        })
                        setIsLoading(false)
                        alert("Succusfully Login")

                        navigation.navigate("Home");
                    }
                })

            } catch (err) {
                setIsLoading(false);
                console.log(err);

            }
        }
    }


    return(isLoading ? <>
        <View className='flex-1 justify-center flex-row  p-3'>

            <ActivityIndicator size="large"/>

        </View>
    </> : <SafeAreaView className="flex-1 items-center justify-center m-4">
        <TextInput value={
                loginData.email
            }
            className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-6 text-black"

            placeholder="Enter the Email"
            placeholderTextColor={"black"}

            onChangeText={
                email => setLoginData({
                    ...loginData,
                    email
                })
        }></TextInput>

        <TextInput secureTextEntry={true}
            value={
                loginData.password
            }
            className="border-solid border-2 border-sky-500 w-full pl-4 rounded-lg mb-6 text-black"

            placeholder="Enter the Password"
            placeholderTextColor={"black"}

            onChangeText={
                password => setLoginData({
                    ...loginData,
                    password
                })
        }></TextInput>


        <TouchableOpacity className='h-10 w-28  rounded-lg bg-[#62CDFF] items-center justify-center mb-4  '
            onPress={
                () => {
                    sendtoBackend()
                }
        }>
            <Text className='font-bold text-black '>LOGIN</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={
            () => navigation.navigate("Signup")
        }>
            <Text className='text-black'>Dont't Have Account</Text>
        </TouchableOpacity>


    </SafeAreaView>);
};

export default Login;
