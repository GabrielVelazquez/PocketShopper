import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
//expo start para mostrar el qr code
export default function ItemSelect({navigation, route}) {
    let language = route.params.language;
    let greeting = language === "french?" ? "bonjour" : "Hello";
  /*return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <StatusBar style="auto" />
    </View>
  );
  */
 // const Page = () => {
    return (
      <View style={styles.container}>
        {/* Header Title */}
        <Text style={styles.title}>Add items to list</Text>
  
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search" />
        </View>
  
        {/* Image Slots */}
        <View style={styles.imagesContainer}>
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
        </View>
      </View>
    );
  //};
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A71AF', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5A71AF',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignItems: 'center',
      color: '#ffff',
    },
    searchContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      //backgroundColor: '#fff',
      borderRadius: 5,
      marginBottom: 20,
    },
    searchInput: {
      padding: 10,
      color:'#000',
      placeholdercolor: '#000',
    },
    imagesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 5,
    },
  });

  