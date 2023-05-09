import React, { useState } from "react";
// import firebase from '../firebase.config'; //FIRESTORE
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";


export default function Sign_up() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = (email, password, repeatedPassword) => {
    if (!email || !password || !repeatedPassword) {
      setError("Please fill in all the fields");
      return;
    } else if (password !== repeatedPassword) {
      setError("Passwords do not match");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            username: username,
            email: email,
          };
  
          // Store the username in Firestore
          firebase.firestore().collection("users").doc(user.uid).set(userData);
  
          setUser(user);
          console.log(user);
          navigation.navigate("HomeScreen"); // redirect to HomeScreen
        })
        .catch((error) => {
          setIsLoading(false);
          setError("Email already in use");
        });
    }
  };
  

  return (
    <View style={styles.container}>
       <LinearGradient style={styles.gradientBackdrop}
        locations={[0.15, 0.53, 0.89]}
        colors={[
          "#c6d8eb",
          "rgba(198, 216, 235, 0)",
          "rgba(163, 176, 230, 0.61)",
        ]} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
       <Image style={styles.backButton} source={require('../assets/arrow_back_FILL0_wght400_GRAD0_opsz48.png')} />
      </TouchableOpacity>

      <View style={{marginBottom:45, top:30}}>
      <Image style={styles.image} source={require('../assets/Pocketshopper_logo_v4.png')} />
      <Text style={styles.imagetext}>Pocket{'\n'}Shopper</Text>
      </View>

      <Text style={{fontSize:30, fontWeight:'bold', bottom:10}}>Create account</Text>
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email address"
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Re-enter password"
          placeholderTextColor="#000"
          textAlign="center"
          secureTextEntry={true}
          onChangeText={(repeatedPassword) =>
            setRepeatedPassword(repeatedPassword)
          }
          // onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#000"
          textAlign="center"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
      <TouchableOpacity
        style={styles.SignUpBtn}
        onPress={() => handleSignUp(email, password, repeatedPassword)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.SignUpText}>Done</Text>
        )}
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  
  logo: {
    marginBottom: 40,
    width: 110,
    height: 110,
    borderRadius: 15,
  },
  inputView: {
    backgroundColor: "#C6D8EB",
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 20,
    //alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize:20,
    marginRight:0,
  },
  SignUpBtn: {
    width: "80%",
    borderRadius: 5,
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
  backButton: {
    position: "absolute",
    top: 35,
    left: 10,
    height:40,
    width:40,
  },
});
