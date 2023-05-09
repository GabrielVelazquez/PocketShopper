import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function RemadeProfile ({ navigation }) {

const [Phone, setPhone] = useState("");
const [location, setlocation] = useState("");
const [dateofbirth, setdateofbirth] = useState("");
const [description, setdescription] = useState("");
const [image, setimage] = useState(null);
const [error, setError] = useState(null);

  return (
      
    <>  
    <Text>We are almost done! Now we just need to set up your profile!</Text>
          
        <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <Text style={{marginVertical:20,fontSize:16}}>Welcome!</Text>
                    </View>
            </View>
            
            <View style={styles.container}>
                <Text style={{marginVertical:20,fontSize:16}}>Welcome, FuzzySid</Text>
                
            </View>

        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Enter phone number (###-###-####)..."
                placeholderTextColor="#000"
                textAlign="center"
                onChangeText={(description) => setdescription(description)} />
        </View>    
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Enter phone number (###-###-####)..."
                placeholderTextColor="#000"
                textAlign="center"
                onChangeText={(Phone) => setPhone(Phone)} />
        </View>
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Enter your date of birth (mm/dd/yyyy)..."
                placeholderTextColor="#000"
                textAlign="center"
                onChangeText={(dateofbirth) => setdateofbirth(dateofbirth)} />
        </View>  
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Enter location..."
                placeholderTextColor="#000"
                textAlign="center"
                onChangeText={(location) => setlocation(location)} />
        </View>
        <View style={styles.inputView}>
              <TextInput
                  style={styles.TextInput}
                  placeholder="Enter phone number (###-###-####)..."
                  placeholderTextColor="#000"
                  textAlign="center"
                  onChangeText={(Phone) => setPhone(Phone)} />
          </View>
    </>
  );
}
const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  };
const styles = StyleSheet.create({
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
  container:{
    elevation:2,
    height:200,
    width:200,
    backgroundColor:'#efefef',
    position:'relative',
    borderRadius:999,
    overflow:'hidden',
},
uploadBtnContainer:{
    opacity:0.7,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'lightgrey',
    width:'100%',
    height:'25%',
},
uploadBtn:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center'
}
})