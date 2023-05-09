import {firebase} from '../firebase.config'; //FIRESTORE
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
const LOGIN = ({navigation}) => {


//export default function LOGIN() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  return (
    <View style={styles.container}>
       <LinearGradient style={styles.gradientBackdrop}
        locations={[0.15, 0.53, 0.89]}
        colors={[
          "#c6d8eb",
          "rgba(198, 216, 235, 0)",
          "rgba(163, 176, 230, 0.61)",
        ]} />
        <View style={{marginBottom:45, top:20}}>
      <Image style={styles.image} source={require('../assets/Pocketshopper_logo_v4.png')} />
      <Text style={styles.imagetext}>Pocket{'\n'}Shopper</Text>
      </View>
      
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#000"
          textAlign="center"
          onChangeText={(email) => setEmail(email)}
          value={email}
        /> 
      </View> 

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#000"
          textAlign="center"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        /> 
      </View> 

      {errorMessage !== "" && <Text style={styles.errorText}>Email or Password is incorrect</Text>}
      <TouchableOpacity
  style={styles.loginBtn}
  onPress={() => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Login successful, navigate to the home screen
        navigation.navigate('HomeScreen');
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
        setErrorMessage(error.message);
      });
  }}>
  <Text style={styles.loginText}>LOGIN</Text>
</TouchableOpacity>

       <Text style = {{color: "#000", top:45,}}>or Create Account</Text>
       
      <TouchableOpacity style={styles.SignUpBtn} onPress={()=> navigation.navigate("Sign_up")}>
        <Text style={styles.SignUpText}>Sign Up</Text> 
      </TouchableOpacity>
    </View> 
  );
}
//}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
 
  inputView: {
    backgroundColor: "#C6D8EB",
    width: "70%",
    height: 45,
    marginBottom: 20,
    top:30,
    //alignItems: "center",

    //textAlign: "center",
    // alignSelf: "center",
   // borderWidth: 1,
    //borderColor: '#ccc',
    //backgroundColor: '#fff',
    borderRadius: 5,
    //marginBottom: 5,
    //width: 310,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize:20,
    marginRight:0,
    
    
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    
  },
  loginBtn: {
    width: "65%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#636D85",
    borderRadius: 5,
    top:30,
  },
  loginText: {
    color: "#fff"
  },
  SignUpBtn: {
    width: "70%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#F1F5F8",
    top:30,
  },
  SignUpText: {
    color: "#000"
    
  },
  image: {
    width: 125,
    height: 125,
    right:80,
    bottom:30,
  },
  imagetext:{
    fontSize: 45,
    color: '#000',
    textAlign: "center",
    position: "absolute",
    left:45,
    bottom:35,
  },
  gradientBackdrop: {
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    height: "100%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "transparent",
    position: "absolute",
  },
  gradientBackdrop: {
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    height: "100%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "transparent",
    position: "absolute",
  },
  errorText: {
    backgroundColor:'#D01B1B',
    color: '#fff',
    fontSize:20,
    height:30,
    width: 280,
    textAlign:'center',
  },
});


export default LOGIN