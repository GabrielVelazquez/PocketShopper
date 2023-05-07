import React from 'react';
import { View } from 'react-native';
import HamburgerMenu from './test';

const CrearLista = ({ navigation }) => {
  return (
    <View>
      {/* OtherPage content */}
      <HamburgerMenu navigation={navigation} />
      {/* OtherPage content */}
    </View>
  );
};

export default CrearLista;
