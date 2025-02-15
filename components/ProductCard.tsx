import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
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
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        globalStyles.card,
        { backgroundColor: hovered ? "#e0e0e0" : "#f8f8f8" },
      ]}
    >
      <Image source={product.image} style={globalStyles.image} />
      <Text style={globalStyles.name}>{product.name}</Text>
      <Text style={globalStyles.price}>{product.price}</Text>
    </Pressable>
  );
};

export default ProductCard;
