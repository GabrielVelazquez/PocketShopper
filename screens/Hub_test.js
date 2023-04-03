import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
//expo start para mostrar el qr code
export default function Hub({navigation}) {
  return (
    <View style={styles.container}>
        <Button 
        title="Navigate to Item Select"
        onPress={()=> navigation.navigate("ItemSelect",{language: "french?"})} //parametro para pasar data
        />

        <Button 
        title="Navigate to other"
        onPress={()=> navigation.navigate("ItemSelect",{language: "english?"})} //parametro para pasar data
        />

<Text>This is the pocketShooper Hub, where all the pages will be linked for testing!</Text>
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
});
