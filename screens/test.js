import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';

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
        <Text style={styles.menuText}>Menu Item 1</Text>
        <Text style={styles.menuText}>Menu Item 2</Text>
        <Text style={styles.menuText}>Menu Item 3</Text>
        {/* Menu content */}
        {/* Place your menu items here */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  },
  hamburger: {
    width: 30,
    height: 3,
    backgroundColor: 'black',
    marginVertical: 3,
    right: 165,
    bottom: 350,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    //width:60,
    backgroundColor: '#5469A3',
    zIndex: 1,
    borderRightWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
  },
  menuText: {
    color: 'white',
    fontSize: 18,
    padding: 10,
  },
});

export default HamburgerMenu ;
