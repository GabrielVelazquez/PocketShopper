import {firebase} from '../firebase.config'; //FIRESTORE
import { StatusBar } from "expo-status-bar";
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
      <Image style={styles.image} source={require('../assets/Pocketshopper_logo_v4.png')} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username/Email..."
          placeholderTextColor="#000"
          textAlign="center"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password..."
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

       <Text style = {{color: "#fff"}}>Or Create Account, ya dingus</Text>
       
      <TouchableOpacity style={styles.SignUpBtn}>
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
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#C6D8EB",
    borderRadius: 0,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 0,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#636D85",
  },
  loginText: {
    color: "#fff"
  },
  SignUpBtn: {
    width: "80%",
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
    width: 110,
    height: 110,
    borderRadius: 15,
  },
});


export default LOGIN