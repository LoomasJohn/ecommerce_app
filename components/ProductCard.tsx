import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

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
      style={styles.card} 
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "green",
    textAlign: "center",
  },
});

export default ProductCard;
