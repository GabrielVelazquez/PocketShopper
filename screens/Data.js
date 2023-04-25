//import { StatusBar } from 'expo-status-bar';
//import {Picker} from '@react-native-picker/picker'; //constant drop down
//import { SelectList } from 'react-native-dropdown-select-list'
import React,{useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, SafeAreaView, ScrollView} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown' //npm install react-native-select-dropdown
//import Data from './Data';
import {firebase} from '../firebase.config';//
//import { async } from '@firebase/util';//
const Data = ({navigation}) => {//navigation
//expo start para mostrar el qr code

  const [items, setItems] = useState([]);
  const todoRef = firebase.firestore().collection('Items');

  useEffect(async () => {
    todoRef.onSnapshot(
      querySnapShot => {
        const items = []
    querySnapShot.forEach((doc) => {
      const {name, category, price}=doc.data()
      items.push({
    id: doc.id, name, category, price,
  })
  })
  setItems(items)
  }
  )
 },[]
)


  //const [name, setName] = useState('');
  //const [category, setCategory] = useState('');
  //const [price, setPrice] = useState('');
  const categories = ["Fruit", "Dairy", "Meat", "Vegetable"]
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemcategory, setItemCategory] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleCreateItem = () => {
    setModalVisible(true);
  };

  const modalhandleCancelCreate = () => {
    setModalVisible(false);
    setItemName('');
    setItemCategory('');
    setItemPrice('');
  };

  const handleSaveItem = () => {
    // do something with itemName
    setItemName('');
    setItemCategory('');
    setItemPrice('');
    setModalVisible(false);
  };

    return (
      <View style={styles.container}>
    
        {/* Header Title */}
        <Text style={styles.title}>Add items to list</Text>
        <Text style={styles.searchtext}>Search Item</Text>
  
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholderTextColor="#000" placeholder="Search" />
        </View>
        <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Image Slots First Category */}
        <Text style={styles.category1}>Fruit</Text>
        <TouchableOpacity style={styles.button}>
        <View style={styles.imagesContainer}>
        {/*text goes here*/}
          {/* renderItem={} */}
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          {/*Aqui ira id para base de datos que muestre por categortia y id*/}
          
          {/*<Image style={styles.image} source={require('../assets/mydonut.png')} /> */}
         {/* <Image style={styles.image} source={require('../assets/mydonut.png')} /> */}
        </View>
        </TouchableOpacity>

        {/* Image Slots Second category*/}
        <Text style={styles.category2}>Dairy</Text>
        <View style={styles.imagesContainer}>
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          {/* trabajar en paginacion  */}
         {/*<Image style={styles.image} source={require('../assets/mydonut.png')} /> */}
          
        </View>
        </ScrollView>
    </SafeAreaView>
        
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
              value={itemName}
              onChangeText={(text) => setItemName(text)}
            />
{/*
<View style={styles.selectContainer}>
            <SelectList
              selectedValue={category}
              style={styles.select}
              onValueChange={(itemValue, itemIndex) =>
                setCategory(itemValue)
              }
            >
              <SelectList.Item label="Category 1" value="category1" />
              <SelectList.Item label="Category 2" value="category2" />
              <SelectList.Item label="Category 3" value="category3" />
            </SelectList>
          </View>
            */}
              <SelectDropdown style={styles.dropdownstyle} 
	data={categories}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
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
              value={itemPrice}
              onChangeText={(text) => setItemPrice(text)}
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
        <TouchableOpacity style={styles.modalbuttoncreate}>
          <Text style={{color:'#fff',fontSize: 16,textAlign:'center'}}>Create</Text>
        </TouchableOpacity>
      </View>
      </Modal>

      

      </View> //termina el return
    );
//}//navigation
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
    imagesContainer: {
      flexDirection: 'row' ,
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 15,
    },
    category1: {
        fontSize: 24,
        fontWeight: 'bold',
        //font: Inter,
        marginBottom: 1,
        alignItems: 'center',
        color: '#000',
        backgroundColor: "#F7A0CB",
        width: 70,
    height: 27,
    marginBottom: 10,
      },
      category2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 1,
        alignItems: 'center',
        color: '#000',
        backgroundColor: "#F6EC95",
    // borderRadius: 10, buscar luego como cambiar radius
        width: 70,
    height: 27,
    marginBottom: 5,
      },
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
      //MODAL---------------------------------
  });

  export default Data