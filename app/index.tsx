import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, FlatList, TextInput } from "react-native";
import { useProducts } from "../app/ProductContext"; 
import ProductCard from "../components/ProductCard"; 
import { globalStyles } from "../styles/globalStyles"; // Import global styles

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
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>UNG Bookstore</Text>

      {/* Category Picker */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue: string) => setSelectedCategory(itemValue)}
        style={globalStyles.picker}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>

      <TextInput
        style={globalStyles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={globalStyles.row}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
};

export default HomeScreen;
