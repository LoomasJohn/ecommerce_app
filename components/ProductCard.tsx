import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { globalStyles } from "../styles/globalStyles"; // Import global styles

interface Product {
  id: string;
  name: string;
  price: string;
  image: any;
}

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={globalStyles.card} //Use global styles
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image source={product.image} style={globalStyles.image} />
      <Text style={globalStyles.name}>{product.name}</Text>
      <Text style={globalStyles.price}>{product.price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;
