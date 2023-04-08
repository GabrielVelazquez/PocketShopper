import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
const LocalDataTable = () => {//navigation
const data = [
  {
    id: 1,
    name: 'Apple',
    category: 'Fruit',
    image: require('../assets/mydonut.png')
  },
  {
    id: 2,
    name: 'Donut',
    category: 'Sweets',
    image: require('../assets/mydonut.png')
  },
  {
    id: 3,
    name: 'Milk',
    category: 'Dairy',
    image: require('../assets/mydonut.png')
  },
];

const LocalDataTable = () => {
  const [tableData, setTableData] = useState(data);

  const renderItem = ({ item }) => (
    <View>
      <Image source={item.image} />
      <Text>{item.name}</Text>
      <Text>{item.category}</Text>
    </View>
  );

  return (
    <FlatList
      data={tableData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    category: {
      fontSize: 14,
      color: '#555'
    },
    image: {
      width: 50,
      height: 50,
      marginRight: 10
    }
  });
  
export default LocalDataTable;