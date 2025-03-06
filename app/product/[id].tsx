import { View, Text, Image, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useCart } from "../cart";
import { useProducts } from "../ProductContext"; 
import { globalStyles } from "../../styles/globalStyles"; 
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { id } = useLocalSearchParams(); // 'id' is a string from the URL
  const router = useRouter();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { products } = useProducts(); 

  // Convert string URL param to number:
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product) {
      navigation.setOptions({ title: product.name });
    }
  }, [product, navigation]);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const handleAddToCart = () => {
    Alert.alert("Added to Cart", `${product.name} has been added to your cart.`);
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    router.push("/cart");
  };

  const [backHovered, setBackHovered] = useState(false);
  const [cartHovered, setCartHovered] = useState(false);

  return (
    <View style={globalStyles.container}>
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        onHoverIn={() => setBackHovered(true)}
        onHoverOut={() => setBackHovered(false)}
        style={[
          globalStyles.button,
          { backgroundColor: backHovered ? "#005fa3" : "#0077cc" },
        ]}
      >
        <Text style={globalStyles.buttonText}>← Back</Text>
      </Pressable>

      <Image source={product.image} style={globalStyles.image} />
      <Text style={globalStyles.name}>{product.name}</Text>
      <Text style={globalStyles.description}>{product.description}</Text>
      <Text style={globalStyles.price}>{product.price}</Text>

      {/* Add to Cart Button */}
      <Pressable
        onPress={handleAddToCart}
        onHoverIn={() => setCartHovered(true)}
        onHoverOut={() => setCartHovered(false)}
        style={[
          globalStyles.button,
          { backgroundColor: cartHovered ? "#005fa3" : "#0077cc" },
        ]}
      >
        <Text style={globalStyles.buttonText}>Add to Shopping Cart</Text>
      </Pressable>
    </View>
  );
};

export default ProductPage;
