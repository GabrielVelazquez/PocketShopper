import { createStore } from 'redux';

const initialState = {
  data: [
    { id: '1', name: 'Apple', category: 'Fruit', price: '1.31', image: require('../assets/apple.png') },
    { id: '2', name: 'Banana', category: 'Fruit', price: '1.00', image: require('../assets/banana.png') },
    { id: '3', name: 'Strawberry', category: 'Fruit', price: '2.00', image: require('../assets/strawberry.png') },
    { id: '4', name: 'Milk', category: 'Dairy', price: '3.50', image: require('../assets/milk.png') },
    { id: '5', name: 'Cheese', category: 'Dairy', price: '4.00', image: require('../assets/itemlplaceholder.png') },
    { id: '6', name: 'Donut', category: 'Pastry', price: '2.50', image: require('../assets/mydonut.png') },
  ],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // Add any additional cases here to handle updating the data
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
