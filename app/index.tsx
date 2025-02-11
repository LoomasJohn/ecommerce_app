import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  // Mock product data (temporary placeholders)
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: "$999", image: require("../assets/images/laptop.png") },
    { id: 2, name: "Microsoft Office", price: "$149", image: require("../assets/images/software.png") },
    { id: 3, name: "Headphones", price: "$199", image: require("../assets/images/headphones.png") },
    { id: 4, name: "Printer", price: "$249", image: require("../assets/images/printer.png") },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products based on search input
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
        numColumns={2} // Ensures two products per row
        columnWrapperStyle={styles.row} // Style for rows
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => alert(`Clicked on ${item.name}`)} // Temporary alert instead of navigation
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
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
  row: {
    flex: 1,
    justifyContent: "space-around", // Distributes items evenly
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 1, // Ensures equal width distribution
    margin: 8, // Adds spacing between items
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
