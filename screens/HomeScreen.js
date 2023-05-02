import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView,  FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lists, setLists] = useState([]);

  //const datalist = [
  //  {id: '1', name: 'Christmas List', Boolean:'1' }, //0=shared, 1=personal
  //];

  const categories = ['Fruits', 'Vegetables', 'Meat', 'Dairy'];
  const renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => {navigation.navigate("ItemSelect"); console.log('Navigate to list:', item.id)}}>
      <View style={styles.listbox}>  
        <Text style={styles.listtext}>{item.name}</Text>
        <Text style={styles.listtextammount}>{item.items.length}/#</Text>
      </View>
    </TouchableOpacity>
  );
   
  const [newListName, setNewListName] = useState('');
  
    
    // const handleCreateList = () => {
    //   const newList = { id: Math.random().toString(), name: newListName, items: [] };
    //   setLists([...lists, newList]);
    //   setNewListName('');
    // };
    // setModalVisible(false);
    const handleCreateList = () => {
      if (newListName !== '') {
        const newList = { id: Math.random().toString(), name: newListName, items: [] };
        setLists([...lists, newList]);
        setNewListName('');
        setModalVisible(false);
        console.log(newListName);
      }
      console.log(lists);
      console.log(newListName);
    };
 

  const handleSubmit2 = () => {
    // Add code to handle the submission of the new item here
    console.log(newItemName, selectedCategory);
    setModalVisible2(false);
  };
  
  

  const handleCancel = () => {
    setModalVisible(false);
    setModalVisible2(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/Pocketshopper_logo_v4.png')}
        />
        <Text style={styles.headerText}>Pocket {'\n'}Shopper</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Create List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible2(true)}>
          <Text style={styles.buttonText}>Create Item</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.divisionShared}>
          <Text style={styles.divisionTitle}>Shared Lists</Text>
        </View>
        <View style={styles.divisionPersonal}>
          <Text style={styles.divisionTitle}>Personal Lists</Text>
        </View>
        
      <FlatList
        data={lists}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />
        <View style={styles.divisionArchived}>
          <Text style={styles.divisionTitleArchived}>Archived Lists</Text>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Create List</Text>
            {/* Add code for creating a new list here */}
            <Text style={{fontSize:25,color:'#fff',bottom: 55,right:45}}>List name</Text>
            <TextInput
      style={styles.modallistInput}
      placeholder="List Name"
      onChangeText={(text) => setNewListName(text)}
    />
           
          </View>
        </View>
        <View style={styles.modalbuttonContainer}>
        <TouchableOpacity style={styles.modalButtonCancel} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        <TouchableOpacity style={styles.modalButtonCreate} onPress={handleCreateList}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
            </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >

<View style={styles.modalContainer}>
  <View style={styles.modal}>
    <Text style={styles.modalTitle}>Create Item</Text>
    <Text style={{ fontSize: 25, color: '#fff' }}>Item Name:</Text>
    <TextInput
      style={styles.input}
      placeholder="Item Name"
      onChangeText={(text) => setNewItemName(text)}
    />
 
<View style={styles.categoryContainer}>
{categories.map((category) => (
<TouchableOpacity
key={category}
style={[
styles.categoryButton,
selectedCategory === category && styles.categoryButtonSelected,
]}
onPress={() => setSelectedCategory(category)}
>
<Text
style={[
styles.categoryText,
selectedCategory === category && styles.categoryTextSelected,
]}
>
{category}
</Text>
</TouchableOpacity>
))}
</View>
<TouchableOpacity style={styles.modalButton} onPress={handleSubmit2}>
<Text style={styles.buttonText}>Create</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
<Text style={styles.buttonText}>Cancel</Text>
</TouchableOpacity>
</View>
</View>
</Modal>
</SafeAreaView>
);
}


const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  },
  header: {
        backgroundColor: '#5469A3',
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
      },
      logo: {
            width: 100,
            height: 80,
            resizeMode: "contain",
            bottom:5,
          },
  headerText: {
  fontSize: 24,
  fontWeight: 'bold',
  marginLeft: 10,
  bottom:5,
  },
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 20,
  backgroundColor: '#B1C0D8',
  },
  button: {
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 1,
  backgroundColor: '#FEFEFE',
  },
  buttonText: {
  color: '#000',
  fontWeight: 'bold',
  fontSize: 20,
  },
  scrollView: {
  flex: 1,
  backgroundColor: '#B1C0D8',
  paddingHorizontal: 10,
  },
  divisionShared: {
  right:5,
  fontSize: 24,
  fontWeight: 'bold',
  color: '#868892',
  backgroundColor: "#FEFEFE",
  width: '102%',
  height: 40,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 1, //5
  },
  divisionPersonal: {
  right:5,
  fontSize: 24,
  fontWeight: 'bold',
  color: '#868892',
  backgroundColor: "#FEFEFE",
  width: '102%',
  height: 40,
  marginTop: 20,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 1,//5
  },
  divisionArchived: {
  right:5,
  fontSize: 24,
  fontWeight: 'bold',
  color: '#868892',
  backgroundColor: "#FF784C",
  width: '102%',
  height: 40,
  marginTop: 20,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 1, //5
  },
  divisionTitle: {
  fontSize: 23,
  fontWeight: 'bold',
  right:5,
  color:'#868892',
  },
  divisionTitleArchived: {
    fontSize: 23,
    fontWeight: 'bold',
    right:5,
    color: '#fff',
    },
  content: {
  marginTop: 10,
  },
  emptyMessage: {
  textAlign: 'center',
  color: '#ccc',
  marginTop: 40,
  },
  item: {
  fontSize: 16,
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(84, 105, 163, 0.87)',
    alignItems: 'center',
    justifyContent: 'center',
  },
listbox: {
    backgroundColor: '#636C84',
    marginTop: 10,
    width: '102%',
    height:65,
    },
listtext: {
  left:5,
  top:2,
      color: '#fff',
      fontSize:25,
      fontWeight:'bold',
      },
      listtextammount: {
        left:"82%",
        bottom:17,
            color: '#fff',
            fontSize:30,
            fontWeight:'bold',
            },
  modal: {
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#BBC6DA',
    width: 340,
    height: 388,
  },
  modalTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color:'#fff',
    textAlign: 'center',
    paddingTop: 1 ,
    //position:'absolute',
     top:'-12%',
     right:10,
     marginBottom:50,
  },
  modalTextInput: {
  width: '100%',
  borderColor: 'gray',
  borderWidth: 1,
  paddingVertical: 10,
  paddingHorizontal: 15,
  marginBottom: 20,
  borderRadius: 5,
  },
  modalPicker: {
  width: '100%',
  borderColor: 'gray',
  borderWidth: 1,
  paddingVertical: 10,
  paddingHorizontal: 15,
  marginBottom: 20,
  borderRadius: 5,
  },
  modalButton: {
  backgroundColor: '#87CEFA',
 
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginHorizontal: 5,
  },
  modallistInput:{
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
   marginBottom: -25,
    width: 200,
    height: 40,
    bottom: 50,
    right:0,
    },
    modalButtonCreate:{
      backgroundColor: '#636D85',
      borderRadius: 2,
      paddingVertical: 15,
      paddingHorizontal: 50,
    },
    modalButtonCancel:{
      backgroundColor: '#FF784C',
      borderRadius: 2,
      paddingVertical: 15,
      paddingHorizontal: 50,
    },
    modalbuttonContainer: {
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
  });
