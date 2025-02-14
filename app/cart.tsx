import React, { createContext, useState, useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

// Cart context for managing cart state
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: any;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Screen
const Cart = () => {
    const { cart, removeFromCart } = useCart();
  
    console.log("Current cart items:", cart);
  
    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0);
  
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Shopping Cart</Text>
  
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
              <Text>{item.name} - {item.price}</Text>
              <Button title="Remove" onPress={() => removeFromCart(item.id)} />
            </View>
          )}
        />
  
        {/* Total Price Display */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
          Total: ${totalPrice.toFixed(2)}
        </Text>
      </View>
    );
  };
  

export default Cart;
