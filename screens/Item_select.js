import React, { useState } from 'react';
import {StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, Modal, SafeAreaView, ScrollView, FlatList} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown' //npm install react-native-select-dropdown
const ItemSelect = ({navigation}) => {//navigation
  
const data = [
  { id: '1', name: 'Apple', category: 'Fruit', price: '1.31',image: require('../assets/mydonut.png') },
  { id: '2',name: 'Banana', category: 'Fruit', price: '1.00', image: require('../assets/mydonut.png') },
  { id: '3',name: 'Milk', category: 'Dairy', price: '3.50', image: require('../assets/mydonut.png') },
  { id: '4',name: 'Cheese', category: 'Dairy', price: '4.00', image: require('../assets/mydonut.png') },
];

const categoryColors = {
  "fruit": "#F7A0CB",
  "dairy": "#F6EC95",
};
const [items, setItems] = useState(data);
const [newItemName, setNewItemName] = useState(data);
const [selectedCategory, setSelectedCategory] = useState(null);
const [newPriceName, setNewPriceName] = useState(data);

const [modalVisible, setModalVisible] = useState(false);
const categories = Array.from(new Set(data.map(item => item.category))); // extract unique categories from the data array

const handleCreateItem = () => {
  setModalVisible(true);
};

const modalhandleCancelCreate = () => {
  setModalVisible(false);
 //setItemName(''); //('')
  //setItemCategory('');
  //setItemPrice('');
};

  const renderItem = (item) => {
    return (
      <Pressable key={item.id} onPress={() => console.log(item.name)}>
      <Text style={styles.text}>{item.name}</Text>
      <Image source={item.image} style={styles.image} />
    </Pressable>
    );
  };

  const renderCategory = (category) => {
    const categoryItems = items.filter((item) => item.category === category);
    return (
      <View style={styles.category}>
        
        <Text style={styles.categoryTitle}>{category}</Text>
        <View style={styles.list}>{categoryItems.map(renderItem)}</View>
      </View>
    );
  };

  const handleAddItem = (category) => {
    //setModalVisible(true);
    const newItem = {
      id: `${Date.now()}`,
      name: `New ${category} Item`,
      category: category,
      //price: price,
      image: require('../assets/mydonut.png'),
    };
    setItems([...items, newItem]);
  };

  const renderAddItem = (category) => {
    return (
      <Pressable key={category} style={styles.addButton}onPress={() => handleAddItem(category)}> 
        <Text style={styles.addButtonText}>+ Add {category}</Text>
      </Pressable>
    );
  };
  //^^^ Clone for modal input
  const handleSaveNewItem = (selectedCategory) => { //if  selecteedcategory == category. category: selectedcategory
    setModalVisible(false);
    const newItem = {
      id: `${Date.now()}`,
      name: newItemName,
      category: selectedCategory,
      //category:`${selectedCategory} `,
      price: newPriceName,
      image: require('../assets/mydonut.png')
    };
    setItems([...items, newItem]);
  };


  const renderCategories = () => {
    const categories = Array.from(new Set(items.map((item) => item.category)));
    return categories.map((category) => (
      <View key={category} style={styles.containercat}>
        {renderCategory(category)}
        {renderAddItem(category)}
      </View>
    ));
  };
  
  //render stuff?
  return (
//Background and Search Bar--------------------------------
    <View style={styles.container}>
        {/* Header Title */}
        <Text style={styles.title}>Add items to list</Text>
        <Text style={styles.searchtext}>Search Item</Text>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholderTextColor="#000" placeholder="Search" />
        </View>
{/*Shows data, images, cat, etc.*/}
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {renderCategories()}
    </ScrollView>

{/*Bottom buttons n modal*/}
{/* Button Container */}
<View style={styles.buttonContainer}>
        {/* Button 1 */}
        <TouchableOpacity style={styles.buttoncreate} onPress={handleCreateItem}>
          <Text style={{color:'#000',fontSize: 16,textAlign:'center'}}>Create Item</Text>
        </TouchableOpacity>

        {/* Button 2 */}
        <TouchableOpacity style={styles.buttondone} onPress={()=> navigation.navigate("CrearLista")}>{/*DONE */}
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
            <Text style={styles.modalText}>Item name</Text>
            <TextInput
              style={styles.modalInput}
              value={newItemName}
              onChangeText={(text) => setNewItemName(text)}
            />
{/**/}
            <SelectDropdown style={styles.dropdownstyle} 
	data={categories}
	onSelect={(selectedItem, index) => { 
		console.log(selectedItem, index)
    setSelectedCategory(selectedItem);
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>

              <Text style={styles.modalText}>Item Price (optional)</Text>
            <TextInput
              style={styles.modalInput}
              value={newPriceName}
              onChangeText={(text) => setNewPriceName(text)}
            />

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
    paddingTop:70,
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
    },
  searchContainer: {
      textAlign: "center",
      alignSelf: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
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
    width: 70,
    height: 25,
  },
  categoryfruit: { 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    backgroundColor: "#F7A0CB",
    width: 70,
    height: 25,
  },
  categorydairy: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    backgroundColor: "#F7A0CB",
    width: 70,
    height: 25,
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
  //MODAL---------------------------------
  modalContainer: { //modal completo
    flex: 1,
    backgroundColor: 'rgba(84, 105, 163, 0.87)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: { //modal box
    backgroundColor: '#BBC6DA',
    margin: 80, //size all
   padding: 60, // centralizar interior
    //width:350,
    borderRadius: 30, //curvas
    //flex:.5,//lenght
  },
  modalText: {
   fontSize:20,
   color:'#fff',
  },
  modalInput:{
    textAlign: "center",
    alignSelf: "center",
  borderWidth: 1,
  borderColor: '#ccc',
  backgroundColor: '#fff',
  borderRadius: 5,
  marginBottom: 10,
  width: 200,
  height: 30,
  },
  dropdownstyle: {
   },
  modalTitle:{ //texto arriba del modal
    fontSize: 35,
    fontWeight: 'bold',
    color:'#fff',
    textAlign: 'center',
    paddingTop: 1 ,
    //position:'absolute',
    top:'-45%',
     right:10,
     marginBottom:-90,
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