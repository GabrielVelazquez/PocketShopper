import React, { useState } from 'react';
import {StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, Modal, SafeAreaView, ScrollView, FlatList} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown' //npm install react-native-select-dropdown
import { LinearGradient } from "expo-linear-gradient"; //FIRESTORE
import {firebase} from '../firebase.config'; //FIRESTORE
//import storage from '@react-native-firebase/storage';
//import { initializeApp } from 'firebase/app';
const ItemSelect = ({navigation}) => {//navigation
const ItemRef = firebase.firestore().collection('Items'); //FIRESTORE

//const ItemRef = firebase.firestore().collection('Items');
//const database = firebase.database();
const database = firebase.database();

const data = [
  //{ id: '1', name: 'Apple', category: 'Fruit', price: '1.31',image: require('../assets/apple.png') },
  //{ id: '2',name: 'Banana', category: 'Fruit', price: '1.00', image: require('../assets/banana.png') },
  //{ id: '3',name: 'Strawberry', category: 'Fruit', price: '2.00', image: require('../assets/strawberry.png') },
  //{ id: '4',name: 'Milk', category: 'Dairy', price: '3.50', image: require('../assets/milk.png') },
  //{ id: '5',name: 'Cheese', category: 'Dairy', price: '4.00', image: require('../assets/cheese.png') },
  //{ id: '6',name: 'Donut', category: 'Pastry', price: '2.50', image: require('../assets/mydonut.png') },
  //{ id: '7',name: 'Ham', category: 'Meat', price: '5.50', image: require('../assets/ham.png') },
  //{ id: '8',name: 'Cups', category: 'Other', price: '2.50', image: require('../assets/mydonut.png') },
];
//const categories=[];


//FIRESTORE WIP
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

const [searchText, setSearchText] = useState(''); //textinput
const [items, setItems] = useState(data);
const [newItemName, setNewItemName] = useState(data);
const [selectedCategory, setSelectedCategory] = useState(null);
const [newPriceName, setNewPriceName] = useState(data);
const [modalVisible, setModalVisible] = useState(false);
const categories = Array.from(new Set(items.map(item => item.category)));

//const categories = Array.from(new Set(data.map(item => item.category))); // extract unique categories from the data array
//COMENTAR categories ^^^
const handleCreateItem = () => {
  setModalVisible(true);
};

const modalhandleCancelCreate = () => {
  setModalVisible(false);
 setNewItemName(''); //('')
 setSelectedCategory('');
  setNewPriceName('');
};

//BORRAR LUEGO#####################################################
//const [count, setCount] = useState(0);
/*console.log(item.name) se remplaza con add to list con correct id */
  const renderItem = (item) => {
//COUNT DE ITEM INDIVIDUAL PERO SEARCH NO FUNCIONA CON ESTO
 const handlePress = () => {//----------------
  //setCount(count + 1);//se le suma 1 al count al presionar--------------
};
    return (
      <TouchableOpacity key={item.id} onPress={() => {handlePress(); console.log(item.name);}}>
      <Text style={styles.itemtext}>{item.name}</Text> 
      <Image source={item.image} style={styles.image} />
      <Pressable style={styles.itemcounter}></Pressable>
      <Text style={{fontSize:15,color:'#fff',left:80,bottom:55,marginBottom:-50}}></Text> 
    </TouchableOpacity>
    );
  };    
  /*</TouchableOpacity>is {item.price}</Text> //FIRESTORE*/
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
        return item.category === category && item.name.toLowerCase().includes(searchText.toLowerCase());});
    return (
      <View style={styles.category}>
        {/*<Text style={styles.categoryTitle}>{category}</Text> */}
        <Text style={[styles.categoryTitle,{backgroundColor}]}>{category}</Text> 
        <View style={styles.list}>
          {filteredItems.map(renderItem)}</View>
      </View>
    );
  };

  /*
  const handleAddItem = (category) => {
    //setModalVisible(true);
    const newItem = {
      id: `${Date.now()}`,
      name: `New ${category} Item`,
      category: category,
      //price: price,
      image: require('../assets/itemlplaceholder.png'),
    };
    setItems([...items, newItem]);
  };
  */

  //setItems(prevItems => {
   // return[{id: id(), text}, ...prevItems]
  //})

  /*
  const renderAddItem = (category) => {
    return (
      <Pressable key={category} style={styles.addButton}onPress={() => handleAddItem(category)}> 
        <Text style={styles.addButtonText}>+ Add {category}</Text>
      </Pressable>
    );
  };
  */

  //^^^ Clone for modal input
  const handleSaveNewItem = (selectedCategory) => { //if  selecteedcategory == category. category: selectedcategory
    setModalVisible(false);
    const newItem = {
      id: `${Date.now()}`,
      name: newItemName,
      category: selectedCategory,
      //category:`${selectedCategory} `,
      price: newPriceName,
      image: require('../assets/itemlplaceholder.png')
    };
    const itemsRef = database.ref('Items'); // Use a specific location in the database
  itemsRef.push(newItem);
    setItems([...items, newItem]);
    //database.ref(`Items/${selectedCategory}`).set(newItem);//
    
    //database.ref(`lists/${newListId}`).set(newItem);
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
  
  //render stuff?
  return (
//Background and Search Bar--------------------------------


    <View style={styles.container}>
      <LinearGradient style={styles.gradientBackdrop}
        locations={[0.45, 0.9, 1]}
        colors={[
          "#5a71af",
          "rgba(177, 192, 216, 0.9)",
          "rgba(195, 212, 233, 0.61)",
        ]} />
        {/* Header Title */}
        <Text style={styles.title}>Add items to list</Text>

        <Text style={styles.searchtext}>Search Item</Text>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholderTextColor="#000" placeholder="Search" value={searchText}
  onChangeText={setSearchText} />
        </View>

        <View>
    
    </View>
        
{/*muestra data, images, cat, etc.*/}
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {renderCategories()}
    </ScrollView>


{/*Bottom buttons n modal*/}
{/* Button Container */}
<View style={styles.buttonContainer}>
        {/* Button 1 crear */}
        <TouchableOpacity style={styles.buttoncreate} onPress={handleCreateItem}>
          <Text style={{color:'#000',fontSize: 16,textAlign:'center',}}>Create Item</Text>
        </TouchableOpacity>

        {/* Button 2 terminar */}
        <TouchableOpacity style={styles.buttondone} onPress={()=> navigation.navigate("HomeScreen")}>{/*DONE */}
          <Text style={{color:'#fff',fontSize: 16,textAlign:'center'}}>Done</Text>
        </TouchableOpacity>
      </View>


       {/* Pop-up */}
       <Modal
animationType="fade"
transparent={true}
visible={modalVisible}
onRequestClose={() => setModalVisible(false)}
>
<View style={styles.modalContainer}>
  <View style={styles.modal}>
  <Text style={styles.modalTitle}>Create Item</Text>
    <Text style={{fontSize:25,color:'#fff',bottom: 70,right:10}}>Item name</Text>
    <TextInput
      style={styles.modalnameInput}
      value={newItemName}
      onChangeText={(text) => setNewItemName(text)}
    />
{/**/}
    <SelectDropdown //style dont work >:( tengo que improvisar
data={categories}
onSelect={(selectedItem, index) => { 
console.log(selectedItem, index)
setSelectedCategory(selectedItem);
}}
buttonTextAfterSelection={(selectedItem, index) => {
// texto que muestra luego de escogerlo
return selectedItem
}}
rowTextForSelection={(item, index) => {
// texto en el drop
return item
}}
/>
      <Text style={{fontSize:23,color:'#fff', bottom:-10, right:1}}>Item Price (optional)</Text>
    <TextInput
      style={styles.modalpriceInput}
      value={newPriceName}
      onChangeText={(text) => setNewPriceName(text)}
      keyboardType="numeric"
    />

<Text style={{fontSize:23,color:'#fff', bottom:-25, right:50}}>Add image</Text>

<TouchableOpacity style={{backgroundColor: '#636D85',  width: 50,height: 50,borderRadius: 55/2,
left:40,bottom:10}}>
<Text style={{fontSize:40,color:'#fff', left:13, bottom:1}}>+</Text>
</TouchableOpacity>


   {/*} <TouchableOpacity style={styles.modalButton} onPress={handleSaveItem}>
      <Text style={styles.modalButtonText}>Save</Text>
    </TouchableOpacity>
  */}
  </View>
 
</View>

 {/* Modal Button Container */}
<View style={styles.modalbuttonContainer}>
{/* Button Modal Cancel */}
<TouchableOpacity style={styles.modalbuttoncancel} onPress={modalhandleCancelCreate}>
  <Text style={{color:'#fff',fontSize: 16,textAlign:'center'}}>Cancel</Text>
</TouchableOpacity> 

{/* Button Modal Create */}
<TouchableOpacity style={styles.modalbuttoncreate} onPress={() => handleSaveNewItem(selectedCategory)}>
  <Text style={{color:'#fff',fontSize: 16,textAlign:'center'}}>Create</Text>
</TouchableOpacity>
</View>
</Modal>
  
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A71AF',
    padding: 20,
    paddingTop:125,
    
  },
  gradientBackdrop: {
    top: 0,
    left: 0,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    width: 400,
    backgroundColor: "transparent",
    position: "absolute",
    height: 850,
  },
  title: {
    fontSize: 24,
    //fontWeight: 'bold',
    marginTop: -40,
    marginBottom: 20,
    alignItems: 'center',
    color: '#ffff',
    textAlign: "center",
   alignSelf: "center"
  },
  searchtext: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 1,
      alignItems: 'center',
      color: '#ffff',
      left:20,
    },
  searchContainer: {
      textAlign: "center",
      alignSelf: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5,
    width: 310,
  },
  searchInput: {
  //fontWeight: 'bold',
    padding: 10,
  },
//NEW STYLES-----------------------------------------
  scrollContainer: {
    padding: 16,
  },
  containercat: {
    marginBottom: 16,
  },
  category: {
    marginBottom: 10,
  },
  categoryTitle: { //categoryfruit, check later los colores
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    backgroundColor: "yellow",
    width: 130,
    height: 27,
    borderRadius: 8,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
      height: 100,
      borderRadius: 15,
  },
  text: {
    textAlign: 'center',
  },
  itemtext:{
    //fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
  },
  addButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  addButtonText: {
    fontWeight: 'bold',
  },
  //Buttons and modal
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    marginBottom:10,
  },
  buttoncreate: {
    backgroundColor: '#FEFEFE',
    borderRadius: 2,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  buttondone: {
    backgroundColor: '#636D85',
    borderRadius: 2,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  oneText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  itemcounter: {
    backgroundColor: '#FF784C',
    width: 35,
    height: 35,
    borderRadius: 40/2,
    left:67,
    bottom:30,
},     
  //MODAL---------------------------------
  modalContainer: { //modal completo
    flex: 1,
    backgroundColor: 'rgba(84, 105, 163, 0.87)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: { //modal box
    /*
    backgroundColor: '#BBC6DA',
    margin: 90, //size all
   padding: 60, // centralizar interior
    //width:350,
    borderRadius: 30, //curvas
    //flex:.5,//lenght
    */
      //top: 223,
      alignItems: 'center',
      borderRadius: 30,
      backgroundColor: '#BBC6DA',
      width: 340,
      height: 388,
     // position: "absolute",
  },
  modalText: {
    fontSize:25,
    color:'#fff',
    bottom: 50,
    right:15,
  },
  modalnameInput:{
  borderColor: '#ccc',
  backgroundColor: '#fff',
  borderRadius: 5,
 marginBottom: -25,
  width: 200,
  height: 40,
  bottom: 50,
  right:0,
  },

  modalpriceInput:{
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    height: 40,
    bottom: -15,
    right:1,
    },
  modalTitle:{ //texto arriba del modal
    fontSize: 35,
    fontWeight: 'bold',
    color:'#fff',
    textAlign: 'center',
    paddingTop: 1 ,
    //position:'absolute',
     top:'-15%',
     right:10,
     marginBottom:80,
  },
  modalbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    //top:'55%',
    bottom: 170,
    right: 45,
    //padding: 2,  
  },
  modalbuttoncancel: {
    backgroundColor: '#FF784C',
    borderRadius: 2,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  modalbuttoncreate: {
    backgroundColor: '#636D85',
    borderRadius: 2,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ItemSelect