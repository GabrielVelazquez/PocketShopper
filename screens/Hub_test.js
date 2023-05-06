import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StyleSheet, Text, Button, View, Image} from 'react-native';
//expo start para mostrar el qr code
export default function Hub({navigation}) {
  return (

    <View style={styles.container}>

<View style={styles.imagesContainer}>
    <Image style={styles.image} source={require('../assets/Pocketshopper_logo_v4.png')} />
  </View>

        <Button 
        title="Navigate to Item Select"
        onPress={()=> navigation.navigate("ItemSelect")} //parametro para pasar data
        />

        <Button 
        title="Navigate to CrearLista"
        onPress={()=> navigation.navigate("CrearLista")} //parametro para pasar data
        />

        <Button 
        title="Navigate to CrearLista 'Styled' for testing only "
        onPress={()=> navigation.navigate("test")} //parametro para pasar data
         />

        <Button 
        title="Navigate to Data Preview for testing only"
        onPress={()=> navigation.navigate("LocalDataTable")} //parametro para pasar data
         />

        <Button 
        title="Navigate to LOGIN"
        onPress={()=> navigation.navigate("LOGIN")} //parametro para pasar data
        />
        <Button 
        title="Navigate to Sign_up"
        onPress={()=> navigation.navigate("Sign_up")} //parametro para pasar data
        />
        <Button 
        title="Navigate to Profile Screens"
        onPress={()=> navigation.navigate("ProfileScreen")} //parametro para pasar data
        />
        <Button 
        title="Navigate Home Template "
        onPress={()=> navigation.navigate("HomeScreen")} //parametro para pasar data
         />
         <Button 
        title="Navigate View List "
        onPress={()=> navigation.navigate("ListModified")} //parametro para pasar data
         />
 

<Text>This is the PocketShopper Debugging Hub, where all the pages will be linked for testing without 
    relying on other pages!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B1C0D8', 
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 100,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 15,
  },
});
