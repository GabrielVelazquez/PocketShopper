//expo start para mostrar el qr code
//help para el terminal
//Set-ExecutionPolicy -ExecutionPolicy unrestricted
//npm install @react-navigation/native @react-navigation/native-stack
//npx expo install react-native-screens react-native-safe-area-context
//npm install -g yarn // yarn add expo
import Hub from "./screens/Hub_test";
import ItemSelect from "./screens/Item_select";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
<Stack.Navigator>
  <Stack.Screen
    name="HUB"
    component={Hub}
    options={{tittle: "Welcome"}}
  />
  <Stack.Screen 
  name="ItemSelect"
  component={ItemSelect}

  />
</Stack.Navigator>
</NavigationContainer>
  );
}

/*
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//expo start para mostrar el qr code
export default function App() {
  return (
    <View style={styles.container}>
      <Text>The beginning of pocket shopper!</Text>
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
*/

