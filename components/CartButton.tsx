import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../app/cart"; 
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";

const CartButton = () => {
  const router = useRouter();
  const { cart } = useCart();

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/cart")}>
      <Ionicons name="cart" size={24} color="#fff" />
      {totalItems > 0 && (
        <View style={globalStyles.badge}>
          <Text style={globalStyles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
