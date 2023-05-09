// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import CheckBox from 'react-native-check-box';

// export default function App() {

//   const [isChecked, setIsChecked] =useState({
//     apple: false,
//   });

//   return (
//     <View style={{padding: 30}}>
//       <Text style={{fontsize:22,  marginBottom:20}}>select</Text>
//       <CheckBox isChecked={isChecked.apple} 
//       onClick={() => setIsChecked({...isChecked, apple: !isChecked.apple})}
//       rightText="apple"
//       rightTextStyle={{color: isChecked.apple ? 'green': 'black'}}
//       checkedCheckBoxColor='green'
//       uncheckedCheckBoxColor='red'/>
//     </View>
//   );
// };

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Border, Color, /*FontFamily,*/ FontSize} from "../GlobalStyles";
import { firebase } from '../firebase.config';
import { Checkbox } from 'react-native-paper';

const firestore = firebase.firestore();
const ItemRef = firestore.collection('Items');

const ListModified = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = ItemRef.onSnapshot(querySnapshot => {
      const itemsData = [];
      querySnapshot.forEach(doc => {
        const { name, category, price } = doc.data();
        itemsData.push({
          id: doc.id,
          name,
          category,
          price,
          checked: false, // Añade la propiedad "checked" al objeto del artículo
        });
      });
      setItems(itemsData);
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, []);

  const handleItemPress = (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const renderCategory = (category) => {
    const categoryItems = items.filter(item => item.category === category);

    return (
      <View>
        <Text>{category}</Text>
        {categoryItems.map(item => (
          <TouchableOpacity key={item.id} onPress={() => handleItemPress(item.id)}>
            <View>
              <Checkbox.Android
                status={item.checked ? 'checked' : 'unchecked'}
                onPress={() => handleItemPress(item.id)}
              />
              <Text>{item.name} - {item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCategories = () => {
    const categories = Array.from(new Set(items.map(item => item.category)));

    return categories.map(category => (
      <View key={category}>
        {renderCategory(category)}
      </View>
    ));
  };

  return (
    <View>
      <ScrollView>
        {renderCategories()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerback: {
    //flex: 1,
    backgroundColor: '#5469A3', 
    alignItems: 'center',
    justifyContent: 'center',
    height:170,
  },
  containerfront: {
    //flex: 1,
    //top: 0,
    //left: 0,
    backgroundColor: Color.lightsteelblue_200,
    width: 390,
    height: 850,
    position: "absolute",
  },
  PageTitle: {
    top: 100,
    left: 135,
    fontSize: 30,
    //height: 31,
    //width: 20,
    textAlign: "center",
    color: Color.white,
    //fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
category: {
  marginTop:2,
  marginBottom: 0,
  width: 360,
},
categoryTitle: { //categoryfruit, check later los colores
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 1,
  color: '#000',
  width: 360,
  height: 41,
  borderRadius: 8,
  left:5,
},
list: {
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  //marginBottom:-30,
},
/*image: {
  width: 100,
    height: 100,
    borderRadius: 15,
},
*/
itemtext:{
  //fontFamily: FontFamily.interMedium,
  fontWeight: "500",
  fontSize: 20,
  textAlign: "center",
  color: "#000",
  marginBottom:10,
  textAlign: "left",
  left:10,
},
fab: {
  backgroundColor: '#FEFEFE',
   //color: '#5469A3',
},

floatingcontainer: {
  flex: 1,
  // Other container styles
},
floatingButton: {
  position: 'absolute',
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '#5469A3',
  alignItems: 'center',
  justifyContent: 'center',
  right: 35,
  bottom: 55,
  elevation: 5, // For Android shadow
  shadowColor: '#000', // For iOS shadow
  shadowOpacity: 0.3, // For iOS shadow
  shadowOffset: {
    width: 0,
    height: 2,
  }, // For iOS shadow
},
floatingbuttonText: {
  fontSize: 24,
  color: '#FFFFFF',
},
backButton: {
  position: "absolute",
  top: 35,
  left: 165,
  height:40,
  width:40,
},
itemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

});
export default ListModified;