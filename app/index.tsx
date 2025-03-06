import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, FlatList, TextInput } from "react-native";
import { getProducts } from "../database"; // Import SQLite fetch function
import ProductCard from "../components/ProductCard"; 
import { globalStyles } from "../styles/globalStyles";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: string;
  image?: string;
}

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]); // Now using local state from SQLite
  const [categories, setCategories] = useState(["All"]); // Static category list for now
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from SQLite when component mounts
  useEffect(() => {
    getProducts(setProducts);
  }, []);

  // Filter products when category or search query changes
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

      {/* Search Bar */}
      <TextInput
        style={globalStyles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={globalStyles.row}
        keyExtractor={(item) => item.id.toString()} // For the FlatList key, this is fine
        renderItem={({ item }) => <ProductCard product={item} />}

      
      />
    </View>
  );
};

export default HomeScreen;
