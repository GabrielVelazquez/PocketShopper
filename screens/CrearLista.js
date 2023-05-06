import { StatusBar } from 'expo-status-bar';
import HamburgerMenu  from './test';
//import HamburgerMenu  from "./screens/test";
import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

const CrearLista = ({navigation}) => {
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
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
        <Text style={{ fontSize: 16 }}>Items: {item.items.length}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      
     <View>
      {/* OtherPage content */}
      <HamburgerMenu navigation={navigation} />
      {/* OtherPage content */}
    </View>
    

      <Text style={{ fontSize: 24, marginBottom: 16 }}>Mis listas de compras</Text>
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
  );
};

export default CrearLista;