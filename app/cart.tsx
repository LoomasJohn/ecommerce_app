import React, { createContext, useState, useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { globalStyles } from "../styles/globalStyles";

// Updated Product interface to track quantity
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: any;
  quantity: number;
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
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) 
    );
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

// Updated Cart Screen
const Cart = () => {
  const { cart, removeFromCart } = useCart();

  console.log("Current cart items:", cart);

  const totalPrice = cart.reduce((sum, item) => sum + (parseFloat(item.price.replace("$", "")) * item.quantity), 0);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Shopping Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text>{item.name} - {item.price} (x{item.quantity})</Text>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
        Total: ${totalPrice.toFixed(2)}
      </Text>
    </View>
  );
};

export default Cart;
