//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, Modal} from 'react-native';
//expo start para mostrar el qr code
const ItemSelect = () => {

    return (
      <View style={styles.container}>
    
        {/* Header Title */}
        <Text style={styles.title}>Add items to list</Text>
        <Text style={styles.searchtext}>Search Item</Text>
  
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholderTextColor="#000" placeholder="Search" />
        </View>
  
        {/* Image Slots First Category */}
        <Text style={styles.category1}>Fruit</Text>
        <View style={styles.imagesContainer}>
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
        </View>

        {/* Image Slots Second category*/}
        <Text style={styles.category2}>Dairy</Text>
        <View style={styles.imagesContainer}>
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
          <Image style={styles.image} source={require('../assets/mydonut.png')} />
        </View>
        
 {/* Button Container */}
 <View style={styles.buttonContainer}>
        {/* Button 1 */}
        <TouchableOpacity style={styles.buttoncreate}>
          <Text style={styles.buttoncreateText}>Create Item</Text>
          
        </TouchableOpacity>

        {/* Button 2 */}
        <TouchableOpacity style={styles.buttondone}>
          <Text style={styles.buttondoneText}>Done</Text>
        </TouchableOpacity>
      </View>

      </View> //termina el return
    );
//}//navigation
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5A71AF',
      padding: 20,
    },
    title: {
      fontSize: 24,
      //fontWeight: 'bold',
      marginBottom: 20,
      alignItems: 'center',
      color: '#ffff',
      textAlign: "center",
     alignSelf: "center"
    },
    searchtext: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 1,
        alignItems: 'center',
        color: '#ffff',
      },
    searchContainer: {
        textAlign: "center",
        alignSelf: "center",
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      borderRadius: 5,
      marginBottom: 20,
      width: 310,
    },
    searchInput: {
    //fontWeight: 'bold',
      padding: 10,
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
    category1: {
        fontSize: 24,
        fontWeight: 'bold',
        //font: Inter,
        marginBottom: 1,
        alignItems: 'center',
        color: '#000',
        backgroundColor: "#F7A0CB",
        width: 70,
    height: 27,
    marginBottom: 5,
      },
      category2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 1,
        alignItems: 'center',
        color: '#000',
        backgroundColor: "#F6EC95",
    // borderRadius: 10, buscar luego como cambiar radius
        width: 70,
    height: 27,
    marginBottom: 5,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
      },
      buttoncreate: {
        backgroundColor: '#FEFEFE',
        borderRadius: 2,
        paddingVertical: 15,
        paddingHorizontal: 50,
      },
      buttondone: {
        backgroundColor: '#636D85',
        borderRadius: 2,
        paddingVertical: 15,
        paddingHorizontal: 50,
      },
      buttoncreateText: {
        color: '#000',
        fontSize: 16,
       // fontWeight: 'bold',
        textAlign: 'center',
        
      },
      buttondoneText: {
        color: '#FFFFFF',
        fontSize: 16,
        //fontWeight: 'bold',
        textAlign: 'center',
      },
  });

  export default ItemSelect