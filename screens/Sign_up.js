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
const Sign_up = ({navigation}) => {
//export default function Sign_up() {
  const [email, setnewEmail] = useState("");
  const [password, setnewPassword] = useState("");
  const [username, setnewUsername] = useState("");
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/Pocketshopper_logo_v4.png')} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter new email..."
          placeholderTextColor="#000"
          textAlign="center"
          onChangeText={(email) => setnewEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter new password..."
          placeholderTextColor="#000"
          textAlign="center"
          secureTextEntry={true}
          onChangeText={(password) => setnewPassword(password)}
        /> 
       </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter new username..."
          placeholderTextColor="#000"
          textAlign="center"
          secureTextEntry={true}
          onChangeText={(username) => setnewUsername(username)}
        /> 
      </View> 
      <TouchableOpacity style={styles.SignUpBtn}>
        <Text style={styles.SignUpText}>Done!</Text> 
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


export default Sign_up