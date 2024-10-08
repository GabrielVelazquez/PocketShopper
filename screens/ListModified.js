import * as React from "react";
import {useState, useEffect } from 'react';
import { Pressable, StyleSheet, View, Text, Image, TouchableOpacity,ScrollView , FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, /*FontFamily,*/ FontSize} from "../GlobalStyles";
import {firebase} from '../firebase.config'; //FIRESTORE
import { Button } from "react-native-paper";
import HamburgerMenu from './test';
import CreateItemModal from "./CreateItemModal";
import { FAB } from 'react-native-paper';

import { useRoute } from '@react-navigation/native';
/////////////////////////////////////////
const firestore = firebase.firestore();
const ListModified = () => {
  const route = useRoute();
  const { listId, lists } = route.params;;
  
  const navigation = useNavigation();
  const [listData, setListData] = useState(null);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

  useEffect(() => {
    const getListData = async () => {
      const listRef = firebase.firestore().collection('Lists').doc(listId);
      const listDoc = await listRef.get();
      const navigation =useNavigation();

      if (listDoc.exists) {
        setListData(listDoc.data());
      }
    };

    getListData();
  }, [listId]);

  const ListDetails = () => {
    if (listData) {
      return (
        <View>
          <Text>List name: {listData.name}</Text>
          <Text>List owner: {listData.owner}</Text>
          <Text>Invite code: {listData.inviteCode}</Text>
          <Button title="Send invite" onPress={() => sendInvite(listData)} />
        </View>
      );
    } else {
      return null;
    }
  };
/////////////////////////////////////////////
  const ItemRef = firebase.firestore().collection('Items'); //FIRESTORE
  const database = firebase.database();
  const data=[];
  (async () => {
},[]
)
ItemRef.onSnapshot(
 querySnapShot => {
   const items = []
   //const categories = []
querySnapShot.forEach((doc) => {
 const {name, category, price}=doc.data()
 items.push({
id: doc.id, name, category, price
}); //console.log(items)
//if (category && !categories.includes(category)) {   PARA CATEGORY DROP LIST
//  categories.push(category);
//}
})
setItems(items)
}
)

const [items, setItems] = useState(data);
const categories = Array.from(new Set(items.map(item => item.category)));
  

const renderItem = ({item}) => {
  if (!items || items.length === 0) {
    return null;
  }
  return items.map((item) => {

    const handlePress = () => {
      // Handle item press here
      console.log('Check off', item.name, 'of', item.price);
    };

    //Check if the item belongs to the current list
    if (item.listId === listId) {
      return (
        <TouchableOpacity key={item.id} onPress={handlePress}>
          {/* Show the selected item from "Item_select" here */}
          <Text style={styles.itemtext}>{item.name} {'\t'} price: ${item.price}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  });
};
   

const renderCategory = (category) => {
  let backgroundColor = '#FFFFFF'; // default blanco
  // cambia el color segun data category
  if (category=== 'Fruit') {
    backgroundColor = '#F7A0CB';
  } else if (category === 'Dairy') {
    backgroundColor = '#F6EC95';
  } else if (category === 'Bakery') {
    backgroundColor = '#F4C283';
  }else if (category === 'Meat') {
    backgroundColor = '#D25241';
  }
  else if (category === 'Fish') {
    backgroundColor = '#7CABC5';
  }
  else if (category === 'Beverages') {
    backgroundColor = '#3574C4';
  }
  else if (category === 'Vegetables') {
    backgroundColor = '#80C547';
  }
  const filteredItems = items.filter((item) => { //const categoryItems = items.filter((item) => item.category === category);
      return item.category === category;});
  return (
    <View style={styles.category}>
      <Pressable style={[styles.categoryTitle,{backgroundColor}]}></Pressable> 
      {/*CHECKBOX HERE*/}
      <Text style={{fontSize: 24,fontWeight: 'bold',color: '#000',width: 360,height: 27,
  bottom:38, left:10,}}>{category}</Text>
      <View style={styles.list}>
        {filteredItems.map(renderItem)}</View>
    </View>
  );
};

const renderCategories = () => {
  const categories = Array.from(new Set(items.map((item) => item.category)));
  return categories.map((category) => (
    <View key={category} style={styles.containercat}>
      {renderCategory(category)}
      {/*renderAddItem(category)*/}
    </View>
  ));
};

  return (
    <View style={styles.containerfront}>
  
    
      
  <View style={styles.containerback}/>
  <HamburgerMenu navigation={navigation} />
  <CreateItemModal navigation={navigation} />

  <Text style={styles.PageTitle}>List Name</Text> 
  {/*{listData?.name} */}
  {/* <Text style={styles.PageTitle}>{ListDetails}</Text> */}
  
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
       <Image style={styles.backButton} source={require('../assets/arrow_back_FILL0_wght400_GRAD0_opsz48.png')} />
      </TouchableOpacity>
      <Text>List Name: {listData?.name}</Text>
      
      {/* <Text>List Name: {lists.name}</Text> */}
{/*<Text>hola</Text> */}
<ScrollView contentContainerStyle={styles.scrollContainer}>
      {renderCategories()}
    </ScrollView>

    <View style={styles.floatingcontainer}>
      <TouchableOpacity style={styles.floatingButton} onPress={()=> navigation.navigate("ItemSelect", {listId: listId, lists:lists})}>
  <Text style={styles.floatingbuttonText}>+</Text>
</TouchableOpacity>

    </View>

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