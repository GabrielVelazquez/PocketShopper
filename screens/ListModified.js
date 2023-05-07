import * as React from "react";
import {useState } from 'react';
import { Pressable, StyleSheet, View, Text, /*Image,*/ TouchableOpacity,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize, Image } from "../GlobalStyles";
import {firebase} from '../firebase.config'; //FIRESTORE
import { Button } from "react-native-paper";
import HamburgerMenu from './test';
/////////////////////////////////////////
const ListModified = () => {

  const navigation = useNavigation();
  const ListDetails = ({ route }) => {
    const { list } = route.params;
    return (
      <View>
        <Text>List name: {list.name}</Text>
        <Text>List owner: {list.owner}</Text>
        <Text>Invite code: {list.inviteCode}</Text>
        <Button title="Send invite" onPress={() => sendInvite(list)} />
      </View>
    );
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
  

const renderItem = (item) => {
  //COUNT DE ITEM INDIVIDUAL PERO SEARCH NO FUNCIONA CON ESTO
   const handlePress = () => {//----------------
    //setCount(count + 1);//se le suma 1 al count al presionar--------------
  };
      return (
        <TouchableOpacity key={item.id} onPress={() => {handlePress(); console.log('Check off ',item.name,' of ',item.price);}}>
        <Text style={styles.itemtext}>{item.name} {'\t'} price: ${item.price}</Text> 
        {/*<Pressable style={styles.itemcounter}></Pressable>*/}
       
      </TouchableOpacity>
      );
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
      <HamburgerMenu navigation={navigation} />
  <View style={styles.containerback}/>

 <Text style={styles.PageTitle}>List Name</Text> 

{/*<Text>hola</Text> */}
<ScrollView contentContainerStyle={styles.scrollContainer}>
      {renderCategories()}
    </ScrollView>




     </View>
  );
};

const styles = StyleSheet.create({
  containerback: {
    //flex: 1,
    backgroundColor: '#5469A3', 
    alignItems: 'center',
    justifyContent: 'center',
    height:150,
  },
  containerfront: {
    //flex: 1,
    top: 0,
    left: 0,
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
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
category: {
  marginTop:10,
  marginBottom: 1,
  width: 360,
},
categoryTitle: { //categoryfruit, check later los colores
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 2,
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
 
});
export default ListModified;