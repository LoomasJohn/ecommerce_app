import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { useProducts } from "../app/ProductContext"; // ✅ Import product context
import ProductCard from "../components/ProductCard"; // ✅ Import new ProductCard component

const HomeScreen = () => {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

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
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <ProductCard product={item} />} // ✅ Use ProductCard
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
  row: {
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 12,
  },
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


export default HomeScreen;
