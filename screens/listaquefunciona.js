import * as React from "react";
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, /*FontFamily,*/ FontSize } from "../GlobalStyles";
import { firebase } from '../firebase.config'; //FIRESTORE
import { Button, CheckBox } from "react-native-elements";
import HamburgerMenu from './test';
import CreateItemModal from "./CreateItemModal";
import { FAB } from 'react-native-paper';
import 'firebase/firestore';

import { useRoute } from '@react-navigation/native';

const firestore = firebase.firestore();
const ListModified = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { listId, lists } = route.params;
  const [listData, setListData] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getListData = async () => {
      try {
        const listRef = firebase.firestore().collection('lists').doc(listId);
        const listDoc = await listRef.get();

        if (listDoc.exists) {
          setListData(listDoc.data());
          setItems(listDoc.data().items); // Actualizar los items de la lista
        }
      } catch (error) {
        console.error('Error retrieving list data:', error);
      }
    };

    getListData();
  }, []);

  const handleItemCheck = (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const renderItem = (item) => {
    const handlePress = () => {
      console.log('Check off', item.name, 'of', item.price);
    };

    return (
      <TouchableOpacity key={item.id} onPress={handlePress}>
        <View style={styles.itemContainer}>
          <CheckBox
            checked={item.completed}
            onPress={() => handleItemCheck(item.id)}
          />
          <Text style={styles.itemtext}>{item.name} - Price: ${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategories = () => {
    const categories = Array.from(new Set(items.map(item => item.category)));

    return categories.map((category) => (
      <View key={category} style={styles.containercat}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{category}</Text>
        {items
          .filter(item => item.category === category)
          .map(renderItem)
        }
      </View>
    ));
  };

  return (
    <View style={styles.containerfront}>
      <Text style={styles.PageTitle}>List Name: {listData?.name}</Text>
      <Text>Invite Code: {listData?.inviteCode}</Text>
      {renderCategories()}
    </View>
  );
};

const styles = StyleSheet.create({
  containerback: {
    //flex: 1,
    backgroundColor: '#5469A3', 
    alignItems: 'center',
    justifyContent: 'center',
    height:170,
  },
  containerfront: {
    //flex: 1,
    //top: 0,
    //left: 0,
    backgroundColor: Color.lightsteelblue_200,
    width: 390,
    height: 850,
    position: "absolute",
  },
  PageTitle: {
    top: 100,
    left: 135,
    fontSize: 30,
    //height: 31,
    //width: 20,
    textAlign: "center",
    color: Color.white,
    //fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
category: {
  marginTop:2,
  marginBottom: 0,
  width: 360,
},
categoryTitle: { //categoryfruit, check later los colores
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 1,
  color: '#000',
  width: 360,
  height: 41,
  borderRadius: 8,
  left:5,
},
list: {
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  //marginBottom:-30,
},
/*image: {
  width: 100,
    height: 100,
    borderRadius: 15,
},
*/
itemtext:{
  //fontFamily: FontFamily.interMedium,
  fontWeight: "500",
  fontSize: 20,
  textAlign: "center",
  color: "#000",
  marginBottom:10,
  textAlign: "left",
  left:10,
},
fab: {
  backgroundColor: '#FEFEFE',
   //color: '#5469A3',
},

floatingcontainer: {
  flex: 1,
  // Other container styles
},
floatingButton: {
  position: 'absolute',
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '#5469A3',
  alignItems: 'center',
  justifyContent: 'center',
  right: 35,
  bottom: 55,
  elevation: 5, // For Android shadow
  shadowColor: '#000', // For iOS shadow
  shadowOpacity: 0.3, // For iOS shadow
  shadowOffset: {
    width: 0,
    height: 2,
  }, // For iOS shadow
},
floatingbuttonText: {
  fontSize: 24,
  color: '#FFFFFF',
},
backButton: {
  position: "absolute",
  top: 35,
  left: 165,
  height:40,
  width:40,
},
itemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

});
export default ListModified;