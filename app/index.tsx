import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import ProductCard from "../components/ProductCard";

const HomeScreen = () => {
  const router = useRouter();

  // Mock product data
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: "$999", category: "Computers", image: require("../assets/laptop.png") },
    { id: 2, name: "Microsoft Office", price: "$149", category: "Software", image: require("../assets/software.png") },
    { id: 3, name: "Headphones", price: "$199", category: "Accessories", image: require("../assets/headphones.png") },
    { id: 4, name: "Printer", price: "$249", category: "Printers", image: require("../assets/printer.png") },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Handle search filtering
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>UNG Bookstore</Text>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => router.push(`/product/${item.id}`)} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

export default HomeScreen;
