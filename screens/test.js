import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CheckboxList = () => {
  const [categories, setCategories] = useState([
    { name: 'Category 1', items: [{ name: 'Item 1', checked: false }, { name: 'Item 2', checked: false }] },
    { name: 'Category 2', items: [{ name: 'Item 3', checked: false }, { name: 'Item 4', checked: false }] },
  ]);

  const handleCheck = (categoryIndex, itemIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].items[itemIndex].checked = !updatedCategories[categoryIndex].items[itemIndex].checked;
    setCategories(updatedCategories);
  };

  return (
    <View>
      {categories.map((category, categoryIndex) => (
        <View key={categoryIndex}>
          <Text>{category.name}</Text>
          {category.items.map((item, itemIndex) => (
            <View key={itemIndex}>
              <CheckBox
                value={item.checked}
                onValueChange={() => handleCheck(categoryIndex, itemIndex)}
              />
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CheckboxList;
