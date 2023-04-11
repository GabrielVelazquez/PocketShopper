import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, Button, TouchableOpacity, length } from 'react-native';
const Data = () => {
  const [lists, setLists] = useState([
    {id: '1', name: 'Apple', category: 'Fruit', image:require('../assets/mydonut.png')},
    { id: '2', name: 'Banana',category: 'Fruit', image:require('../assets/Pocketshopper_logo_v4.png')},
    { id: '3', name: 'Strawberry',category: 'Fruit', image:require('../assets/mydonut.png') },
    { id: '4', name: 'Milk',category: 'Dairy', image:require('../assets/mydonut.png') },
  ]);
  const [newListName, setNewListName] = useState('');

  const createNewList = () => {
    const newList = { id: Math.random().toString(), name: newItemtName, category:newcategory, };
    setLists([...lists, newList]);
    setNewListName('');
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Navigate to list:', item.id)}>
      <View style={styles.imagesContainer}>
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
        <Text style={{ fontSize: 20 }}>{item.category}</Text>
        <Image style={styles.image} source={item.image} />
       {/* } <Text style={{ fontSize: 16 }}>Items: {item.items.length}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Data items from table</Text>
      <FlatList
        data={lists}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />
    </View>
  );
};
export default Data;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A71AF',
    padding: 20,
    paddingTop:70,
  },
   imagesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 15,
    },
});