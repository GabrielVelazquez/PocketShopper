import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const ListModified = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.listModified}>
      <LinearGradient
        style={styles.gradientBackdrop}
        locations={[0.11, 0.57, 0.99]}
        colors={[
          "rgba(84, 105, 163, 0.91)",
          "rgba(177, 192, 216, 0.9)",
          "rgba(195, 212, 233, 0.61)",
        ]}
      />
      <View style={styles.gradientBackdrop1} />
      <Text style={styles.listName}>List Name</Text>
      <Image
        style={styles.listModifiedChild}
        resizeMode="cover"
        source={require("../assets/group-10.png")}
      />
      <Image
        style={[styles.searchItemTextbox, styles.searchItemPosition2]}
        resizeMode="cover"
        source={require("../assets/search-item-textbox.png")}
      />
      <Image
        style={[styles.searchItemTextbox1, styles.searchItemPosition2]}
        resizeMode="cover"
        source={require("../assets/search-item-textbox1.png")}
      />
      <Text style={[styles.fruits, styles.textTypo]}>Fruits</Text>
      <Text style={[styles.text, styles.textTypo]}>2/3</Text>
      <Image
        style={[styles.searchItemTextbox, styles.searchItemPosition2]}
        resizeMode="cover"
        source={require("../assets/search-item-textbox.png")}
      />
      <Image
        style={[styles.searchItemTextbox1, styles.searchItemPosition2]}
        resizeMode="cover"
        source={require("../assets/search-item-textbox1.png")}
      />
      <Text style={[styles.fruits, styles.textTypo]}>Fruits</Text>
      <Text style={[styles.text, styles.textTypo]}>2/3</Text>
      <Image
        style={[styles.searchItemTextbox4, styles.searchItemPosition1]}
        resizeMode="cover"
        source={require("../assets/search-item-textbox.png")}
      />
      <Image
        style={[styles.searchItemTextbox5, styles.searchItemPosition1]}
        resizeMode="cover"
        source={require("../assets/search-item-textbox2.png")}
      />
      <Text style={[styles.dairy, styles.dairyTypo]}>Dairy</Text>
      <Text style={[styles.text2, styles.dairyTypo]}>2/2</Text>
      <Text style={[styles.listname, styles.listnameTypo]}>Apple</Text>

      <Text style={styles.listname1}>Banana</Text>
      <Image
        style={[styles.searchItemTextbox6, styles.searchItemPosition]}
        resizeMode="cover"
        source={require("../assets/search-item-textbox.png")}
      />
      <Image
        style={[styles.searchItemTextbox7, styles.searchItemPosition]}
        resizeMode="cover"
        source={require("../assets/search-item-textbox3.png")}
      />
      <Text style={[styles.meat, styles.meatTypo]}>Meat</Text>
      <Text style={[styles.text3, styles.meatTypo]}>1/5</Text>
      <Text style={[styles.listname2, styles.listnameTypo]}>Pork chop</Text>
      <View style={[styles.listModifiedItem, styles.listLayout]} />
      <Text style={[styles.listname3, styles.listname3Position]}>Steak</Text>
      <View style={[styles.listModifiedInner, styles.listname4Position]} />
      <Text style={[styles.listname4, styles.listname4Position]}>Ribs</Text>
      <View style={[styles.rectangleView, styles.listname5Position]} />
      <Text style={[styles.listname5, styles.listname5Position]}>Chicken</Text>
      <Text style={[styles.listname6, styles.listnameTypo]}>Milk</Text>
      <Text style={[styles.listname7, styles.listnameTypo]}>Yogurt</Text>
      <View style={[styles.listModifiedChild1, styles.listname8Position]} />
      <Text style={[styles.listname8, styles.listname8Position]}>
        Pineapple
      </Text>
     
      <TouchableOpacity
        style={[styles.createButton, styles.createLayout]}
        onPress={() => navigation.navigate("HomePage")}
      />
      <TouchableOpacity
        style={[styles.createButton1, styles.createLayout]}
        onPress={() => navigation.navigate("HomePage")}
      />
      <Text style={[styles.done, styles.priceTypo2]}>Done</Text>
      <TouchableOpacity
        style={[styles.wrapper, styles.listChildLayout6]}
        onPress={() => navigation.navigate("AddItemToList")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/group-15.png")}
        />
      </TouchableOpacity>
      <Text style={[styles.addItem, styles.text4Typo]}>Add item</Text>
      <View style={[styles.listModifiedChild4, styles.listChildLayout5]} />
      <View style={[styles.listModifiedChild5, styles.listChildLayout5]} />
      <View style={[styles.listModifiedChild6, styles.iconPosition1]} />
      <Image
        style={[styles.image3Icon, styles.iconPosition]}
        resizeMode="cover"
        source={require("../assets/image-3.png")}
      />
      <Image
        style={[styles.image4Icon, styles.iconPosition]}
        resizeMode="cover"
        source={require("../assets/image-42.png")}
      />
      <Image
        style={[styles.groupIcon, styles.listChildLayout4]}
        resizeMode="cover"
        source={require("../assets/group-3.png")}
      />
      <Image
        style={[styles.listModifiedChild7, styles.listChildLayout4]}
        resizeMode="cover"
        source={require("../assets/group-3.png")}
      />
      <Image
        style={[styles.listModifiedChild8, styles.listChildLayout4]}
        resizeMode="cover"
        source={require("../assets/group-3.png")}
      />
      <Image
        style={[styles.listModifiedChild9, styles.listChildLayout4]}
        resizeMode="cover"
        source={require("../assets/group-3.png")}
      />
      <Image
        style={[styles.listModifiedChild10, styles.listChildLayout4]}
        resizeMode="cover"
        source={require("../assets/group-3.png")}
      />
      
      <Image
        style={[styles.listModifiedChild14, styles.listChildPosition]}
        resizeMode="cover"
        source={require("../assets/group-16.png")}
      />
      <Image
        style={[styles.listModifiedChild15, styles.listChildPosition]}
        resizeMode="cover"
        source={require("../assets/group-17.png")}
      />
      <View style={[styles.listModifiedChild16, styles.listChildLayout]} />
      <View style={[styles.listModifiedChild17, styles.listChildLayout]} />
      <View style={[styles.listModifiedChild18, styles.listChildLayout]} />
      <Text style={[styles.text4, styles.text4Typo]}>1</Text>
      <Image
        style={styles.listModifiedChild19}
        resizeMode="cover"
        source={require("../assets/group-18.png")}
      />
      <Image
        style={styles.lineIcon}
        resizeMode="cover"
        source={require("../assets/line-16.png")}
      />
      <Image
        style={[styles.image5Icon, styles.iconPosition1]}
        resizeMode="cover"
        source={require("../assets/image-5.png")}
      />
      <Image
        style={[styles.listModifiedChild20, styles.listChildLayout2]}
        resizeMode="cover"
        source={require("../assets/ellipse-11.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchItemPosition2: {
    height: 41,
    borderRadius: Border.br_9xs,
    top: 144,
    left: 7,
    position: "absolute",
  },
  textTypo: {
    color: Color.black,
    top: 154,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xl,
    height: 31,
    width: 227,
    textAlign: "center",
    position: "absolute",
  },
  searchItemPosition1: {
    top: 356,
    left: 5,
    height: 41,
    borderRadius: Border.br_9xs,
    position: "absolute",
  },
  dairyTypo: {
    top: 366,
    color: Color.black,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xl,
    height: 31,
    width: 227,
    textAlign: "center",
    position: "absolute",
  },
  listnameTypo: {
    height: 30,
    width: 179,
    left: 47,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interRegular,
  },
  searchItemPosition: {
    top: 515,
    height: 41,
    borderRadius: Border.br_9xs,
    left: 7,
    position: "absolute",
  },
  meatTypo: {
    top: 525,
    color: Color.black,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xl,
    height: 31,
    width: 227,
    textAlign: "center",
    position: "absolute",
  },
  listLayout: {
    height: 25,
    width: 28,
    borderRadius: Border.br_11xs,
    left: 10,
    backgroundColor: Color.gainsboro_200,
  },
  listname3Position: {
    top: 628,
    position: "absolute",
  },
  listname4Position: {
    top: 672,
    position: "absolute",
  },
  listname5Position: {
    top: 716,
    position: "absolute",
  },
  listname8Position: {
    top: 308,
    position: "absolute",
  },

  createLayout: {
    height: 42,
    backgroundColor: Color.slategray_100,
    position: "absolute",
  },
  priceTypo2: {
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  text4Typo: {
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
 
  iconPosition1: {
    left: 307,
    width: 40,
  },
  iconPosition: {
    height: 36,
    top: 94,
    position: "absolute",
  },

  listChildPosition: {
    width: 25,
    left: 312,
    position: "absolute",
  },
 
  gradientBackdrop: {
    top: 0,
    left: 0,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    height: "100%",
  },
  gradientBackdrop1: {
    top: 60,
    left: 1,
    backgroundColor: Color.lightsteelblue_200,
    width: "100%",
    height: "100%",
    
    position: "absolute",
  },
  listName: {
    top: 29,
    left: 70,
    fontSize: FontSize.size_5xl,
    height: 31,
    width: 227,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  listModifiedChild: {
    top: 11,
    width: 20,
    height: 15,
    left: 7,
    position: "absolute",
  },
  searchItemTextbox: {
    width: 343,
  },
  searchItemTextbox1: {
    width: 281,
  },
  fruits: {
    left: -75,
  },
  text: {
    left: 209,
  },
  searchItemTextbox4: {
    left: 5,
    width: 343,
  },
  searchItemTextbox5: {
    width: 345,
    left: 5,
  },
  dairy: {
    left: -77,
  },
  text2: {
    left: 207,
  },
  listname: {
    top: 206,
    position: "absolute",
  },

  listname1: {
    top: 257,
    height: 30,
    width: 179,
    textAlign: "left",
    left: 47,
    color: Color.black,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  searchItemTextbox6: {
    width: 343,
  },
  searchItemTextbox7: {
    width: 50,
  },
  meat: {
    left: -75,
  },
  text3: {
    left: 209,
  },
  listname2: {
    top: 577,
    position: "absolute",
  },
  listModifiedItem: {
    top: 628,
    position: "absolute",
  },
  listname3: {
    height: 30,
    width: 179,
    left: 47,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interRegular,
  },
  listModifiedInner: {
    height: 25,
    width: 28,
    borderRadius: Border.br_11xs,
    left: 10,
    backgroundColor: Color.gainsboro_200,
  },
  listname4: {
    height: 30,
    width: 179,
    left: 47,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interRegular,
  },
  rectangleView: {
    height: 25,
    width: 28,
    borderRadius: Border.br_11xs,
    left: 10,
    backgroundColor: Color.gainsboro_200,
  },
  listname5: {
    height: 30,
    width: 179,
    left: 47,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interRegular,
  },
  listname6: {
    top: 419,
    position: "absolute",
  },
  listname7: {
    top: 470,
    position: "absolute",
  },
  listModifiedChild1: {
    height: 25,
    width: 28,
    borderRadius: Border.br_11xs,
    left: 10,
    backgroundColor: Color.gainsboro_200,
  },
  listname8: {
    height: 30,
    width: 179,
    left: 47,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interRegular,
  },

  createButton: {
    top: 751,
    left: 272,
    width: 78,
  },
  createButton1: {
    top: 754,
    left: 6,
    width: 130,
  },
  done: {
    top: 761,
    left: 246,
    width: 131,
    height: 45,
    textAlign: "center",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xl,
    color: Color.white,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: 165,
    top: 733,
  },
  addItem: {
    top: 780,
    left: 146,
    color: Color.gray_300,
    width: 91,
    height: 20,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "center",
  },
  listModifiedChild4: {
    left: 254,
    width: 40,
    height: 38,
    top: 92,
  },
  listModifiedChild5: {
    top: 14,
    left: 306,
    width: 42,
  },
  listModifiedChild6: {
    height: 38,
    backgroundColor: Color.slategray_100,
    position: "absolute",
    top: 92,
    left: 307,
  },
  image3Icon: {
    left: 253,
    width: 41,
  },
  image4Icon: {
    left: 307,
    width: 40,
  },
  groupIcon: {
    top: 203,
  },
  listModifiedChild7: {
    top: 419,
  },
  listModifiedChild8: {
    top: 575,
  },
  listModifiedChild9: {
    top: 466,
  },
  listModifiedChild10: {
    top: 254,
  },
  listModifiedChild14: {
    height: 24,
    top: 203,
  },
  listModifiedChild15: {
    height: 430,
    top: 310,
  },
  listModifiedChild16: {
    top: 243,
    backgroundColor: Color.lime,
    height: 23,
    borderRadius: Border.br_9xs,
  },
  listModifiedChild17: {
    top: 273,
    backgroundColor: Color.lime,
    height: 23,
    borderRadius: Border.br_9xs,
  },
  listModifiedChild18: {
    height: 23,
    backgroundColor: Color.gainsboro_200,
    top: 257,
  },
  text4: {
    left: 321,
    top: 260,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.interRegular,
  },
  listModifiedChild19: {
    top: 244,
    left: 318,
    width: 13,
    height: 12,
    position: "absolute",
  },
  lineIcon: {
    top: 288,
    left: 319,
    width: 11,
    height: 2,
    position: "absolute",
  },
  image5Icon: {
    top: 15,
    height: 37,
    position: "absolute",
  },
  listModifiedChild20: {
    top: 42,
    left: 340,
  },
  listModified: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 800,
    width: "100%",
    
  },
});
export default ListModified;

