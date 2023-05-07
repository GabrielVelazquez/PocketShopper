import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native';

const HamburgerMenu  = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuWidth = useState(new Animated.Value(0))[0];

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(menuWidth, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(menuWidth, {
        toValue: 300, // Adjust the width as needed
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        {/* Hamburger button */}
        <View style={styles.hamburger} />
        <View style={styles.hamburger} />
        <View style={styles.hamburger} />
      </TouchableOpacity>
      {/* Menu */}
      <Animated.View style={[styles.menu, { width: menuWidth }]}>
     

      <TouchableOpacity onPress={toggleMenu}>
        {/* Hamburger button */}
        <View style={styles.hamburger} />
        <View style={styles.hamburger} />
        <View style={styles.hamburger} />
      </TouchableOpacity>
    
      {/* Menu */}
        
        <View style={styles.burgerbuttunscontainer}>
        <Pressable onPress={() => {console.log('edit');}}>
        <Text style={styles.menuText}>Edit Profile</Text>
        </Pressable>
   
        <Pressable onPress={() => {console.log('shoppers');}}>
      <Text style={styles.menuText}>Shoppers</Text>
      </Pressable>

      <Pressable onPress={() => {console.log('LogOut');}}>
        <Text style={styles.menuText}>Logout</Text>
        </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    height:800,
  },
  hamburgerContainer: {
    padding: 10,
  },
  hamburger: {
    width: 30,
    height: 3,
    backgroundColor: 'white',
    marginVertical: 3,
    left: 15,
    top:15,
  },
  menu: {
    position: 'absolute',
    height:800,
    //width:60,
    backgroundColor: '#5469A3',
    zIndex: 1,
    borderRightWidth: 1,
    borderColor:'#4A5D92',
    overflow: 'hidden',
  },
  menuText: {
   //top: 100,
   marginBottom:30,
    color: 'white',
    fontSize: 18,
    fontWeight:'bold',
    padding: 15,
    backgroundColor:'#636C84',
    width:250,
    height:55,
    //verticalAlign:'center',
  },
burgerbuttunscontainer: {
    top: 100,
     //verticalAlign:'center',
   },
});

export default HamburgerMenu ;
