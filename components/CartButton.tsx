import React, { useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../app/cart"; 
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";

const CartButton = () => {
  const router = useRouter();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scale = new Animated.Value(1);

  const handleHoverIn = () => {
    Animated.timing(scale, {
      toValue: 1.15, //Grow slightly
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={() => router.push("/cart")}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      style={({ pressed }) => [
        globalStyles.button,
        { backgroundColor: pressed ? "#005fa3" : "#0077cc" },
      ]}
    >
      <Animated.View style={{ transform: [{ scale }] }}> {/* ✅ Wrap in Animated.View */}
        <Ionicons name="cart" size={24} color="#fff" />
        {totalItems > 0 && (
          <View style={globalStyles.badge}>
            <Text style={globalStyles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default CartButton;
