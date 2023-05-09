import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';

export default function App() {

  const [isChecked, setIsChecked] =useState({
    apple: false,
  });

  return (
    <View style={{padding: 30}}>
      <Text style={{fontsize:22,  marginBottom:20}}>select</Text>
      <CheckBox isChecked={isChecked.apple} 
      onClick={() => setIsChecked({...isChecked, apple: !isChecked.apple})}
      rightText="apple"
      rightTextStyle={{color: isChecked.apple ? 'green': 'black'}}
      checkedCheckBoxColor='green'
      uncheckedCheckBoxColor='red'/>
    </View>
  );
};
