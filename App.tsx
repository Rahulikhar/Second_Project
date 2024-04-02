import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import ProductDetails from './src/ProductDetails';
import ShoppingCart from './src/ShoppingCart';
import BottomTab from './src/BottomTab';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='BottomTab'>
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;