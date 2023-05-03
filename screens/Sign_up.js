// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   Button,
//   TouchableOpacity,
// } from "react-native";
// export const Sign_up = ({navigation}) => {
// // export default function Sign_up() {
//   const [email, setnewEmail] = useState("");
//   const [password, setnewPassword] = useState("");
//   const [username, setnewUsername] = useState("");
//   return (
//     <View style={styles.container}>
//       <Image style={styles.image} source={require('../assets/Pocketshopper_logo_v4.png')} />
//       <StatusBar style="auto" />
//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder="Enter new email..."
//           placeholderTextColor="#000"
//           textAlign="center"
//           onChangeText={(email) => setnewEmail(email)}
//         /> 
//       </View> 
//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder="Enter new password..."
//           placeholderTextColor="#000"
//           textAlign="center"
//           secureTextEntry={true}
//           onChangeText={(password) => setnewPassword(password)}
//         /> 
//        </View>
//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.TextInput}
//           placeholder="Enter new username..."
//           placeholderTextColor="#000"
//           textAlign="center"
//           secureTextEntry={true}
//           onChangeText={(username) => setnewUsername(username)}
//         /> 
//       </View> 
//       <TouchableOpacity style={styles.SignUpBtn}>
//         <Text style={styles.SignUpText}>Done!</Text> 
//       </TouchableOpacity>
//     </View> 
//   );
// }
//}

import React, { useState } from "react";
import firebase from '../firebase.config';
import "firebase/auth";
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

import HomeScreen from "./HomeScreen";

export default function Sign_up({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        .then((u) => {
          setUser(u);
          console.log(u);
          navigation.navigate("HomeScreen"); // redirect to HomeScreen
        })
        .catch((e) => {
          setIsLoading(false);
          setError("Email already in use");
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/Pocketshopper_logo_v4.png")}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter new email..."
          placeholderTextColor="#000"
          textAlign="center"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter new password..."
          placeholderTextColor="#000"
          textAlign="center"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter password again..."
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
          placeholder="Enter new username..."
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
});
