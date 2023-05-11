import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, Modal, SafeAreaView, ScrollView, FlatList} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown' //npm install react-native-select-dropdown
import { LinearGradient } from "expo-linear-gradient"; //FIRESTORE
import {firebase} from '../firebase.config'; //FIRESTORE
import { useRoute } from '@react-navigation/native';
//import storage from '@react-native-firebase/storage';
//import { initializeApp } from 'firebase/app';
const ItemSelect = ({navigation}) => {//navigation
const ItemRef = firebase.firestore().collection('Items'); //FIRESTORE
const database = firebase.database();

const route = useRoute();
  const { listId, lists } = route.params;

const [searchText, setSearchText] = useState('');
const [items, setItems] = useState([]);
const [newItemName, setNewItemName] = useState('');
const [newPriceName, setNewPriceName] = useState('');
//const [newItemName, setNewItemName] = useState(data);
const [selectedCategory, setSelectedCategory] = useState(null);
//const [newPriceName, setNewPriceName] = useState(data);
const [modalVisible, setModalVisible] = useState(false);
const categories = Array.from(new Set(items.map(item => item.category)));



//const data = [];
//const categories=[];

useEffect(() => {
  ItemRef.onSnapshot(querySnapShot => {
    const items = querySnapShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      completed: false, // Agrega el campo "completed" con valor inicial "false"
    }));
    setItems(items);
  });
}, []);

//const [searchText, setSearchText] = useState(''); //textinput
//const [items, setItems] = useState(data);

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

const handleSaveNewItem = () => {
  if (!newItemName || !selectedCategory) return;

  const newItem = {
    name: newItemName,
    category: selectedCategory,
    price: newPriceName || '',
  };

  ItemRef.add(newItem)
    .then(() => {
      setItems([...items, newItem]);
      setModalVisible(false);
      setNewItemName('');
      setSelectedCategory('');
      setNewPriceName('');
    })
    .catch(error => {
      console.log('Error creating item:', error);
    });
};

/*
const gotoitem = ({ item}) => {
  const navigateToList = (listId) => {
    navigation.navigate('ListModified', { listId: listId, lists: lists });
    console.log('Navigate to list:', listId);
  };
  
  return (
    <View style={styles.buttonContainer}>
  <TouchableOpacity  style={styles.buttondone} onPress={() => navigateToList(item.id)}
    >
      <Text style={{color:'#fff',fontSize: 16,textAlign:'center'}}>Done</Text>  
        </TouchableOpacity>
        {/*{gotoitem(item)}* /}
        </View>
      );
  }
  */ 




//BORRAR LUEGO#####################################################
//const [count, setCount] = useState(0);
/*console.log(item.name) se remplaza con add to list con correct id */
const renderItem = (item) => {
  const handlePress = () => {
    handleAddToList(lists.items, item); // Agregar el artículo a la lista en Firestore
    console.log(lists);
    console.log(item);
  };

{/*
const getImageSource = () => {
  // Get the image source based on the item's name
  const imageName = item.name.toLowerCase().replace(/\s/g, ''); // Convert the name to lowercase and remove spaces
  return require(`../assets/${imageName}.png`); // Assuming the image files are named in lowercase without spaces and have a .png extension
};
*/}

    return (
      <TouchableOpacity key={item.id} onPress={() => {handlePress(); console.log(item.name);}}onLongPress={() => handleLongPress(item.id)}>
      <Text style={styles.itemtext}>{item.name}</Text> 
      {/*<Image source={getImageSource()} style={styles.image} />*/}
      <Image source={require('../assets/itemplaceholder.png')} style={styles.image} /> 
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

  const handleAddToList = (list, item) => {
    const listRef = firebase.firestore().collection('lists').doc(listId);
  
    // Agregar el artículo a la matriz "items" de la lista en Firestore
    const itemToAdd = { ...item, completed: false }; // Agrega el campo "completed" con valor "false" al artículo
    listRef.update({
      items: firebase.firestore.FieldValue.arrayUnion(itemToAdd)
    })
      .then(() => {
        console.log('Artículo agregado a la lista en Firestore');
      })
      .catch(error => {
        console.log('Error al agregar el artículo a la lista:', error);
      });
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

/*
  const renderListItem = (item) => {

    const navigateToList = (listId) => {
      navigation.navigate('listaquefunciona', { listId: listId, lists: lists });
      console.log('Navigate to list:', listId);
    };
  
    return (
      <TouchableOpacity style={styles.buttondone}
        onPress={() => navigateToList(item.id)}
        onLongPress={() => handleLongPress(item.id)}
      >
        <View style={styles.listbox}>
        <Text style={{color:'#fff',fontSize: 16,textAlign:'center'}}>Done</Text>  
        </View>
      </TouchableOpacity>
    );
  };
 */
  
  
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
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
       <Image style={styles.backButton} source={require('../assets/arrow_back_FILL0_wght400_GRAD0_opsz48.png')} />
      </TouchableOpacity>
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
        <TouchableOpacity  style={styles.buttondone} onPress={()=> navigation.navigate('listaquefunciona', { listId: listId, lists: lists })}>
          <Text style={{color:'#fff',fontSize: 16,textAlign:'center'}}>Done</Text>  
        </TouchableOpacity>
       {/* EL NAVIGATE NO HACE UPDATE A LA LISTA, HAY QUE SALIR Y ENTRAR DENUEVO*/}
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

backButton: {
  position: "absolute",
  top: 35,
  left: 10,
  height:40,
  width:40,
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