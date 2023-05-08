import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, Modal, SafeAreaView, ScrollView, FlatList} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown' //npm install react-native-select-dropdown
import { LinearGradient } from "expo-linear-gradient"; //FIRESTORE
import {firebase} from '../firebase.config'; //FIRESTORE
//import storage from '@react-native-firebase/storage';
//import { initializeApp } from 'firebase/app';
const CreateItemModal = ({navigation}) => {//navigation
const ItemRef = firebase.firestore().collection('Items'); //FIRESTORE
const database = firebase.database();


const [items, setItems] = useState([]);
const [newItemName, setNewItemName] = useState('');
const [newPriceName, setNewPriceName] = useState('');
const [selectedCategory, setSelectedCategory] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const categories = Array.from(new Set(items.map(item => item.category)));
useEffect(() => {
    ItemRef.onSnapshot(querySnapShot => {
      const items = querySnapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(items);
    });
  }, []);

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

            {/*Bottom buttons n modal*/}
{/* Button Container */}
<View style={styles.buttonContainer}>
        {/* Button 1 crear */}
        <TouchableOpacity style={styles.buttoncreate} onPress={handleCreateItem}>
          <Text style={{ color: '#000',
  fontWeight: 'bold',
  fontSize: 20,}}>Create Item</Text>
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
   
//Buttons and modal

  buttoncreate: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#FEFEFE',
  },
  oneText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  }, 
  buttonTextModal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    },
  //MODAL---------------------------------
  modalContainer: { //modal completo
    flex: 1,
    backgroundColor: 'rgba(84, 105, 163, 0.87)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: { //modal box
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

export default CreateItemModal;
