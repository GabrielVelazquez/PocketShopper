import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView,  FlatList, TouchableOpacity, Modal, TextInput, Switch, Button, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../firebase.config';
import { FAB } from 'react-native-paper';
import HamburgerMenu from './test';
import CreateItemModal from "./CreateItemModal";
import { LogBox } from 'react-native';


const firestore = firebase.firestore();
export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [personalLists, setPersonalLists] = useState([]);
  const [sharedLists, setSharedLists] = useState([]);
  const categories = ['Fruits', 'Vegetables', 'Meat', 'Dairy'];
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [archivedLists, setArchivedLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [items, setItems] = useState([]);
  const [inviteCode, setInviteCode] = useState('');
  const [modalVisible3, setModalVisible3] = useState(false);
  const [invitedList, setInvitedList] = useState(null);




  // const [inviteCode, setInviteCode] = useState('');

  const toggleSpeedDial = () => {
    setIsSpeedDialOpen(!isSpeedDialOpen);
  };
  const handleDelete = () => {
    if (selectedList) { // Verifica si selectedList no es nulo
      const updatedLists = lists.filter((list) => list.id !== selectedList.id);
      const archivedList = { ...selectedList, archivedAt: new Date() };
      setLists(updatedLists);
      setArchivedLists([...archivedLists, archivedList]);
      console.log(list);
    // Elimina la lista de Firestore
    firestore
      .collection('lists')
      .doc(selectedList.id)
      .delete()
      .then(() => {
        setSelectedList(null);
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
    }
  };
  

  const renderListItem = ({ item, isShared }) => {
    if (!isShared && item.owner !== firebase.auth().currentUser.uid) {
      return null;
    }
    if (isShared && item.owner  === firebase.auth().currentUser.uid) {
      return null;
    }
  
    const handleLongPress = (listId) => {
      setSelectedListId(listId);
    };
  
    const navigateToList = (listId) => {
      navigation.navigate('listaquefunciona', { listId: listId, lists: lists });
      console.log('Navigate to list:', listId);
    };
  
    return (
      <TouchableOpacity
        onPress={() => navigateToList(item.id)}
        onLongPress={() => handleLongPress(item.id)}
      >
        <View style={styles.listbox}>
          <Text style={styles.listtext}>{item.name}</Text>
          <Text style={styles.listtextammount}>#/{item.items?.length}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  //Join list
  const handleJoinList = () => {
    setModalVisible3(true);
    // Verifica que se haya ingresado un código de invitación
    if (inviteCode !== '') {
      // Realiza la consulta a Firestore para encontrar la lista correspondiente al código de invitación
      firestore
        .collection('lists')
        .where('inviteCode', '==', inviteCode)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // Si se encuentra una lista con el código de invitación, obtén su ID
            const listId = querySnapshot.docs[0].id;
  
            // Agrega al usuario actual como invitado en la lista
            firestore
              .collection('lists')
              .doc(listId)
              .update({
                invitedUsers: firebase.firestore.FieldValue.arrayUnion(
                  firebase.auth().currentUser.uid
                ),
              })
              .then(() => {
                // Realiza cualquier acción adicional después de unirse a la lista
                console.log('Joined list successfully!');
              })
              .catch((error) => {
                console.error('Error joining list: ', error);
              });
          } else {
            console.log('List not found');
          }
        })
        .catch((error) => {
          console.error('Error querying lists: ', error);
        });
    }
  };
  
  
    //Este es el que funciona en el servidor
    const handleCreateList = () => {
      setModalVisible(true);
      if (newListName !== '') {
        const newList = {
          name: newListName,
          items: [], // Inicializa "items" como un array vacío
          owner: firebase.auth().currentUser.uid,
          isShared,
          inviteCode: null,
          archivedBy: null,
          invitedUsers: null,
        };
    
        if (isShared) { // Verifica si la lista es compartida
          // Genera un código de invitación único para la lista
          const inviteCode = Math.random().toString(36).substr(2, 5);
          // Agrega el código de invitación a la lista
          newList.inviteCode = inviteCode;
        }
    
        firestore
          .collection('lists')
          .add(newList)
          .then((docRef) => {
            const newListWithId = { ...newList, id: docRef.id };
            setLists([...lists, newListWithId]);
            setNewListName('');
            setModalVisible(false);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      }
    };
    
    useEffect(() => {
      const currentUser = firebase.auth().currentUser;
    
      return firestore
        .collection('lists')
        .where('owner', '==', currentUser.uid)
        .onSnapshot((querySnapshot) => {
          const newLists = [];
          querySnapshot.forEach((doc) => {
            const newList = { id: doc.id, ...doc.data() };
            newLists.push(newList);
          });
          setPersonalLists(newLists.filter((list) => !list.isShared));
          setSharedLists(newLists.filter((list) => list.isShared));
        });
    }, []);
    
    

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    useEffect(() => {
      const removeArchivedLists = () => {
        const currentDate = new Date();
        const updatedArchivedLists = archivedLists.filter(
          (list) =>
            (currentDate - list.archivedAt) / (1000 * 60 * 60 * 24) < 30 && // Elimina las listas archivadas después de 30 días
            list.archivedBy === firebase.auth().currentUser.uid // Filtra las listas archivadas por el usuario actual
        );
        setArchivedLists(updatedArchivedLists);
      };
    
      const interval = setInterval(removeArchivedLists, 24 * 60 * 60 * 1000); // Verifica el archivado cada 24 horas
    
      return () => clearInterval(interval);
    }, [archivedLists]);
    
    
      const handleModalClose = () => {
        setSelectedList(null);
      };
    
      useEffect(() => {
        if (selectedListId) {
          const selectedList = lists.find((list) => list.id === selectedListId);
          setSelectedList(selectedList);
        } else {
          setSelectedList(null);
        }
      }, [selectedListId, lists]);
 
  const handleSubmit2 = () => {
    // Add code to handle the submission of the new item here
    console.log(newItemName, selectedCategory);
    //<CreateItemModal navigation={navigation} />
    setModalVisible2(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setModalVisible2(false);
    setModalVisible3(false);
  };

  return (
    <View style={styles.container}>
      <HamburgerMenu navigation={navigation} />
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

        {/*<TouchableOpacity style={styles.button} onPress={() => setModalVisible2(true)}>
          <Text style={styles.buttonText}>Create Item</Text>
        </TouchableOpacity>
  */}

        <CreateItemModal navigation={navigation} />
      </View>

      <ScrollView style={styles.scrollView}>
  <View style={styles.divisionShared}>
    <Text style={styles.divisionTitle}>Shared Lists</Text>
  </View>
  <FlatList
    data={sharedLists}
    renderItem={renderListItem}
    keyExtractor={(item) => item.id}
    style={{ flex: 1 }}
    
  />

  <View style={styles.divisionPersonal}>
    <Text style={styles.divisionTitle}>Personal Lists</Text>
  </View>
  <FlatList
    data={personalLists}
    renderItem={renderListItem}
    keyExtractor={(item) => item.id}
    style={{ flex: 1 }}
  />

<View style={styles.divisionArchived}>
  <Text style={styles.divisionTitleArchived}>Archived Lists</Text>
</View>
<FlatList
  data={archivedLists}
  renderItem={renderListItem}
  keyExtractor={(item) => item.id}
  style={{ flex: 1 }}
  borderRadius={10}
/>
</ScrollView>

<FAB.Group 
    fabStyle={styles.fab}
    open={isSpeedDialOpen}
    icon={isSpeedDialOpen ? 'close' : 'plus'}
    actions={[
      {
        icon: 'playlist-plus',
        label: 'Create list',
        onPress: handleCreateList,
      },
      {
        icon: 'playlist-check',
        label: 'Join list',
        overlayColor: '#fff',
        onPress: handleJoinList,
      },
      {
        icon: 'plus-box',
        label: 'Create item',
        onPress: handleSubmit2,
      },
    ]}
    onStateChange={({ open }) => setIsSpeedDialOpen(open)}
    onPress={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
  />

  <Modal
  animationType="fade"
  transparent={true}
  visible={selectedList !== null}
  onRequestClose={() => setSelectedList(null)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>Confirm Delete</Text>
      <Text style={styles.modalText}>
        Are you sure you want to delete the list "{selectedList?.name}"?
      </Text>
      <View style={styles.modalbuttonContainerdelete}>

      <TouchableOpacity style={styles.modalButtonCancel2} onPress={handleDelete}>
          <Text style={styles.buttonTextModal}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modalButtonCreate}
          onPress={() => setSelectedList(null)}
        >
          <Text style={styles.buttonTextModal}>Cancel</Text>
        </TouchableOpacity>
  
      </View>
    </View>
  </View>
</Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
       
    <View style={styles.modal}>
        <Text style={styles.modalTitle}>Create List</Text>
        <Text style={{ fontSize: 25, color: '#fff', bottom: 55, right: 45 }}>List name</Text>
        <TextInput
          style={styles.modallistInput}
          placeholder="List Name"
          onChangeText={(text) => setNewListName(text)}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Switch trackColor={{/*false: '#FF784C'*/ true: '#1FF9FA'}}
        //thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        //ios_backgroundColor="#FF784C"
            value={isShared}
            onValueChange={(value) => setIsShared(value)}
            
          />
          <Text style={{ marginLeft:10,color:'#fff', fontSize:25 }}>Shared List</Text>
        </View>
      </View>
        </View>

        <View style={styles.modalbuttonContainer}>
        <TouchableOpacity style={styles.modalButtonCancel} onPress={handleCancel}>
              <Text style={styles.buttonTextModal}>Cancel</Text>
            </TouchableOpacity>
        <TouchableOpacity style={styles.modalButtonCreate} onPress={handleCreateList}>
              <Text style={styles.buttonTextModal}>Create</Text>
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
      placeholder="Item name"
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
<Text style={styles.buttonText}>Join</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
<Text style={styles.buttonText}>Cancel</Text>
</TouchableOpacity>
</View>
</View>
</Modal>




{/*CODE MODAL*/}
<Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => setModalVisible3(false)}
      >

<View style={styles.modalContainer}>
  <View style={styles.modal}>
    <Text style={styles.modalTitle}>Join a List!</Text>
    <Text style={{ fontSize: 25, color: '#fff', bottom:50 }}>List code:</Text>
    <TextInput
      style={styles.modallistInput}
      placeholder="List code"
      //onChangeText={(text) => setNewItemName(text)}
      value={inviteCode} onChangeText={setInviteCode}
      />
      <View style={styles.modalbuttonContainerjoin}>
      <TouchableOpacity style={styles.modalButtonCancel} onPress={handleCancel}>
<Text style={styles.buttonTextModal}>Cancel</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.modalButtonCreate} //onPress={handleJoinList}> 
onPress={() => {handleJoinList(); setModalVisible3(false);setInviteCode('');}}>
  
{/*onPress={handleSubmit2}>*/}
<Text style={styles.buttonTextModal}>Join</Text>
</TouchableOpacity>
</View>
</View>
</View>
</Modal>
{/*CODE MODAL*/}

</View>
);
}


const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  },
  header: {
        backgroundColor: '#5469A3',
        height: 170,
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
  borderRadius: 10,
  backgroundColor: '#FEFEFE',
  },
  buttonText: {
  color: '#000',
  fontWeight: 'bold',
  fontSize: 20,
  },

  buttonTextModal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    },
 
  scrollView: {
  flex: 1,
  backgroundColor: '#B1C0D8',
  paddingHorizontal: 10,
  },
  divisionShared: {
  // right:5,
  fontSize: 24,
  fontWeight: 'bold',
  color: '#868892',
  backgroundColor: "#FEFEFE",
  width: '100%',
  height: 40,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 10, //5
  },
  divisionPersonal: {
  // right:5,
  fontSize: 24,
  fontWeight: 'bold',
  color: '#868892',
  backgroundColor: "#FEFEFE",
  width: '100%',
  height: 40,
  marginTop: 20,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 10,
  },
  divisionArchived: {
  // right:5,
  fontSize: 24,
  fontWeight: 'bold',
  color: '#868892',
  backgroundColor: "#FF784C",
  width: '100%',
  height: 40,
  marginTop: 20,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 10, 
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
    width: '100%',
    height:65,
    borderRadius: 10,
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
  modalText: {
    fontSize: 20, 
    color: '#fff', 
    //bottom: 55, 
   // right: 45 
   width:250,
   textAlign:'center',
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
      bottom: 120,
      left: 0,
      right: 0,
      padding: 20,
      marginBottom:10,
    },
    fab: {
      backgroundColor: '#FEFEFE',
       //color: '#5469A3',
    },
    modalbuttonContainerdelete: {
      flexDirection: 'column',
      //justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 65,
      left: 0,
      right: 0,
      padding: 10,
      marginBottom:0,
    },
    modalButtonCancel2:{
      backgroundColor: '#FF784C',
      marginBottom:30,
      borderRadius: 2,
      paddingVertical: 15,
      paddingHorizontal: 50,
    },
    backButton: {
      position: "absolute",
      top: 30,
      left: 10,
      height:40,
      width:40,
    },
    modalbuttonContainerjoin: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 100,
      left: 0,
      right: 0,
      padding: 1,
      marginBottom:10,
    },
  });
