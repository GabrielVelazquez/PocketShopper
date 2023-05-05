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
  return (
    <View style={styles.container}>
       <LinearGradient style={styles.gradientBackdrop}
        locations={[0.15, 0.53, 0.89]}
        colors={[
          "#c6d8eb",
          "rgba(198, 216, 235, 0)",
          "rgba(163, 176, 230, 0.61)",
        ]} />
        <View style={{marginBottom:45}}>
      <Image style={styles.image} source={require('../assets/Pocketshopper_logo_v4.png')} />
      <Text style={styles.imagetext}>Pocket{'\n'}Shopper</Text>
      </View>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username/Email"
          placeholderTextColor="#000"
          textAlign="center"
          onChangeText={(email) => setEmail(email)}
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
        /> 
      </View> 
      <TouchableOpacity
  style={styles.loginBtn}
  onPress={() => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Login successful, navigate to the home screen
        navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });
  }}>
  <Text style={styles.loginText}>LOGIN</Text>
</TouchableOpacity>

       <Text style = {{color: "#000", top:20,}}>or Create Account</Text>
       
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
    //borderRadius: 0,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
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
    borderRadius: 0,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#636D85",
    
  },
  loginText: {
    color: "#fff"
  },
  SignUpBtn: {
    width: "70%",
    borderRadius: 0,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#F1F5F8",
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
});


export default LOGIN