import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';

// añadir floating button: npm install react-native-action-button


export default function HomeScreen() {
  const [list, setList] = useState([]);
  const navigation = useNavigation();

  function handleAddItem() {
    const newItem = {
      id: Math.random().toString(),
      name: 'New Item',
    };
    setList([...list, newItem]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/Pocketshopper_logo_v4.png')}
        />
        <Text style={styles.headerText}>Pocket {'\n'}Shopper</Text>
        {/* <Text style={styles.headerText}>Shopper</Text> */}

      </View>
      {/* <View style={styles.divisionContainer}> */}
        <View style={styles.divisionShared}>
          <Text style={styles.divisionTitle}>Shared Lists</Text>
        </View>
        <View style={styles.divisionPersonal}>
          <Text style={styles.divisionTitle}>Personal Lists</Text>
        </View>
        <View style={styles.divisionArchived}>
          <Text style={styles.divisionTitle}>Archived Lists</Text>
        {/* </View> */}
      </View>
      <View style={styles.content}>
        {list.length === 0 ? (
          <Text style={styles.emptyMessage}>Empty</Text>
        ) : (
          list.map((item) => (
            <Text key={item.id} style={styles.item}>
              {item.name}
            </Text>
          ))
        )}
      </View>
      <ActionButton buttonColor="#5469A3" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B1C0D8',
  },
  header: {
    backgroundColor: '#5469A3',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  headerText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 68,
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode:"contain",
    marginTop: 50,
  },
  divisionContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  divisionShared: {
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    // paddingVertical: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#868892',
    backgroundColor: "#FEFEFE",
    width: 400,
    height: 30,
    marginBottom: 7,
    left: 5,
  },
  divisionPersonal: {
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    // paddingVertical: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#868892',
    backgroundColor: "#FEFEFE",
    width: 400,
    height: 30,
    marginBottom: 7,
  },
  divisionArchived: {
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    // paddingVertical: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#868892',
    backgroundColor: "#FF784C",
    width: 400,
    height: 30,
    marginBottom: 7,
  },
  divisionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
  },
});
