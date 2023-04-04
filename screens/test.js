import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

const Test = () => {
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



  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>TEST PAGE</Text>
    </View>
  );
};

export default Test;