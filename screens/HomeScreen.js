/*
import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { recipes } from "../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";

export default function HomeScreen(props) {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
*/



// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { FAB } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';

// export default function HomeScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {/* Aquí va la división de arriba con el color hex 5469A3 */}
//       </View>
//       <View style={styles.content}>
//         <Text style={styles.emptyMessage}>No hay listas creadas</Text>
//       </View>
//       <FAB
//         style={styles.fab}
//         icon="plus"
//         onPress={() => navigation.navigate('Main')}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#B1C0D8',
//   },
//   header: {
//     backgroundColor: '#5469A3',
//     height: 80,
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyMessage: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   fab: {
//     position: 'absolute',
//     margin: 16,
//     right: 0,
//     bottom: 0,
//   },
// });



// import React, { useState } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import ActionButton from 'react-native-action-button';
// import CrearLista from './CrearLista';

// export default function HomeScreen() {
//   const [list, setList] = useState([]);
//   const navigation = useNavigation();

//   function handleAddItem() {
//     const newItem = {
//       id: Math.random().toString(),
//       name: 'New Item',
//     };
//     setList([...list, newItem]);
//   }

  

//   function CrearArticulo() {
//     // Código para la opción 2
//   }

//   function CrearLista() {
//     // Código para la opción 3
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {/* Aquí va la división de arriba con el color hex 5469A3 */}
//       </View>
//       <View style={styles.content}>
//         {list.length === 0 ? (
//           <Text style={styles.emptyMessage}>Empty</Text>
//         ) : (
//           list.map((item) => (
//             <Text key={item.id} style={styles.item}>
//               {item.name}
//             </Text>
//           ))
//         )}
//       </View>
//       <ActionButton buttonColor="#5469A3">
//         {/* <ActionButton.Item
//           buttonColor="#9b59b6"
//           title="Option 1"
//           onPress={handleOption1}
//         /> */}
//         <ActionButton.Item
//           buttonColor="#3498db"
//           title="Crear Articulo"
//           onPress={CrearArticulo}
//         />
//         <ActionButton.Item
//           buttonColor="#1abc9c"
//           title="Crear Lista"
//           onPress={CrearLista}
//         />
//       </ActionButton>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#B1C0D8',
//   },
//   header: {
//     backgroundColor: '#5469A3',
//     height: 80,
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyMessage: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';

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
        <Text style={styles.header}>Pocket Shopper</Text>
      </View>
      <View style={styles.division}>
        <Text style={styles.divisionTitle}>Shared Lists</Text>
      </View>
      <View style={styles.division}>
        <Text style={styles.divisionTitle}>Personal Lists</Text>
      </View>
      <View style={styles.division}>
        <Text style={styles.divisionTitle}>Archived Lists</Text>
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
    height: 100,
    alignItems:"center",
    justifyContent:"center",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode:"contain",
  },
  division: {
    backgroundColor: '#fff',
    padding: 20,
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
