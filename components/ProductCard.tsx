import React, { useState } from "react";
import { View, Text, Image, Pressable, Animated } from "react-native";
import { useRouter } from "expo-router";
import { globalStyles } from "../styles/globalStyles";

interface Product {
  id: string;
  name: string;
  price: string;
  image: any;
}

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const scale = new Animated.Value(1);

  const handleHoverIn = () => {
    Animated.timing(scale, {
      toValue: 1.05,
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
      onPress={() => router.push(`/product/${product.id}`)}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
    >
      <Animated.View style={[globalStyles.card, { transform: [{ scale }] }]}>
        <Image source={product.image} style={globalStyles.image} />
        <Text style={globalStyles.name}>{product.name}</Text>
        <Text style={globalStyles.price}>{product.price}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default ProductCard;
