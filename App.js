//expo start para mostrar el qr code
//help para el terminal
//Set-ExecutionPolicy -ExecutionPolicy unrestricted
//npm install @react-navigation/native @react-navigation/native-stack
//npx expo install react-native-screens react-native-safe-area-context
//npm install -g yarn // yarn add expo
//r en terminal hace reload del app, si el telefono pierde coneccion a vsc
/*the expected .json path doesnt exist
click the right button on package.json
Run in console integrated (Open the console)
Now, you can run it.
*/
import Hub from "./screens/Hub_test";
import ItemSelect from "./screens/Item_select";
import CrearLista from "./screens/CrearLista";
import Test from "./screens/test";
import LocalDataTable from "./screens/Data";
import LOGIN from "./screens/LOGIN";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, style } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
<Stack.Navigator>
  <Stack.Screen
    name="HUB"
    component={Hub}
    //options={{headerShown: false}}
  />
  <Stack.Screen 
  name="ItemSelect"
  component={ItemSelect}
 // options={{headerShown: false}}
  />
<Stack.Screen 
  name="CrearLista"
  component={CrearLista}
  //options={{headerShown: false}}
  />

<Stack.Screen 
  name="Test"
  component={Test}
  //options={{headerShown: false}} 
  />

<Stack.Screen 
  name="LocalDataTable"
  component={LocalDataTable}
  //options={{headerShown: false}}
  />
 {/* <Stack.Screen 
  name="HomeScreen"
  component={HomeScreen}
  //options={{headerShown: false}}
  />
  */}
<Stack.Screen 
  name="LOGIN"
  component={LOGIN}
  //options={{headerShown: false}} 
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

