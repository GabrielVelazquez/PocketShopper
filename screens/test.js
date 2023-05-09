import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native';
import { firebase } from '../firebase.config';

const HamburgerMenu = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuWidth = useState(new Animated.Value(0))[0];
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    // Fetch the username from Firestore
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userRef = firebase.firestore().collection("users").doc(currentUser.uid);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUsername(userData.username);
            setEmail(userData.email);
          } else {
            setUsername("");
            setEmail("");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error getting user document:", error);
          setUsername("");
          setIsLoading(false);
        });
    } else {
      setUsername("");
      setEmail("");
      setIsLoading(false);
    }
  }, []);

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
        <View style={styles.burgerbuttunscontainer}>
         {isLoading ? (
  <Text>Loading...</Text>
) : (
  <>
   <Text style={{fontSize:25,width:250,height:55,marginBottom:10,
  color: 'white',fontWeight:'bold',padding: 15, bottom:30}}>username{email}</Text>

              <Pressable onPress={() => { console.log('edit'); navigation.navigate("RemadeProfile") }}>
                <Text style={styles.menuText}>Edit Profile</Text>
              </Pressable>
              <Pressable onPress={() => { console.log('shoppers'); }}>
                <Text style={styles.menuText}>Shoppers</Text>
              </Pressable>
              <Pressable onPress={() => {
                firebase.auth().signOut()
                  .then(() => {
                    // Logout successful, navigate to the login screen
                    navigation.navigate('LOGIN');
                  })
                  .catch((error) => {
                    console.error("Error logging out:", error);
                  });
              }}>
                <Text style={styles.menuText}>Logout</Text>
              </Pressable>
            </>
          )}
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
    left: 25,
    top:70,
  },
  menu: {
    position: 'absolute',
    height:850,
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
