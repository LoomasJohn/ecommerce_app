import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, FlatList, TextInput, StyleSheet, } from "react-native";
import { useProducts } from "../app/ProductContext"; 
import ProductCard from "../components/ProductCard"; 

const HomeScreen = () => {
  const { products, categories } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Apply search filter
    setFilteredProducts(
      filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, selectedCategory, products]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>UNG Bookstore</Text>

      {/* Category Picker */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue: string) => setSelectedCategory(itemValue)} // ✅ Added type annotation
        style={styles.picker}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>


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
        renderItem={({ item }) => <ProductCard product={item} />}
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
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
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
});

export default HomeScreen;
