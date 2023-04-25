/*
//DEFAULT PAGE 
import { View, Text, } from 'react-native';

const Test = () => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>TEST PAGE</Text>
    </View>
  );
};

export default Test;
//DEFAULT PAGE
*/
import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet,SafeAreaView, ScrollView  } from 'react-native';


const CrearLista = () => {
  const [lists, setLists] = useState([
    { id: '1', name: 'Lista 1', items: ['item 1', 'item 2', 'item 3'] },
    { id: '2', name: 'Lista 2', items: ['item 4', 'item 5', 'item 6'] },
    { id: '3', name: 'Lista 3', items: ['item 7', 'item 8', 'item 9'] },
  ]);
  const [newListName, setNewListName] = useState('');

  const createNewList = () => {
    const newList = { id: Math.random().toString(), name: newListName, items: [] };
    setLists([...lists, newList]);
    setNewListName('');
  };

  
  const renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Navigate to list:', item.id)}>
      

{/*
        <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
        <Text style={{ fontSize: 16 }}>Items: {item.items.length}</Text>
*/}
      <View style={styles.listnamecolor}>
        
        <Text style={{fontSize: 17,color:"#fff",  fontWeight: 'bold', marginRight: 1 ,}}>{item.name}                                                Items: {item.items.length}</Text> 
        <Text style={{fontSize: 17,color:"#fff", fontWeight: 'bold', marginTop:19}}>Date:</Text> 
        {/* BEFORE 1 <Text style={styles.category1}>Fruit</Text> {*/}
        {/* BEFORE 2 <Text style={styles.listnamecolor}>{item.name}</Text> */}
        {/* BEFORE 1 <Text style={{ fontSize: 16 }}>Items: {item.items.length}</Text> */}

      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

    <View style={{ flex: 1, padding: 16 }}>
<Text style={styles.listtype1}>Personal List</Text>
      <FlatList
        data={lists}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />

      


      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 20, marginBottom: 8 }}>Crear nueva lista:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            value={newListName}
            onChangeText={setNewListName}
            style={{ flex: 1, marginRight: 8, padding: 8, fontSize: 16, borderWidth: 1, borderColor: 'gray' }}
          />
          <Button title="Crear" onPress={createNewList} />
        </View>
      </View>
      <View style={{ marginTop: 16 }}>
        <Button title="Administrar cuenta" onPress={() => console.log('Navigate to account management')} />
      </View>
    </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B1C0D8",
    padding: 20,
  },
  listtype1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#868892',
    backgroundColor: "#FEFEFE",
    width: 319,
    height: 30,
    marginBottom: 7,

  },
  listnamecolor: {
    padding: 1,
    //fontSize: 40, //fontSize: 20 
    //fontWeight: 'bold',
    //color: '#fff',
    backgroundColor: "#636C84",
    width: 350,
    height: 62,
    marginBottom: 7,
    flex: 1, 
    alignItems: 'left',
  },
});

export default CrearLista; 