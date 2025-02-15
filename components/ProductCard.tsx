import React, { useState } from "react";
import { View, Text, Image, Pressable, Animated } from "react-native";
import { useRouter } from "expo-router";
import { globalStyles } from "../styles/globalStyles";

interface Product {
  id: string;
  name: string;
  price: string;
  image: any;
  description: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const widthAnim = new Animated.Value(150);
  const opacityAnim = new Animated.Value(0);

  const handleHoverIn = () => {
    Animated.timing(widthAnim, {
      toValue: 300,
      duration: 150,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleHoverOut = () => {
    Animated.timing(widthAnim, {
      toValue: 150,
      duration: 150,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
    >
       <Animated.View style={[globalStyles.card, { width: widthAnim, flexDirection: "row", alignItems: "center" }]}>
        <Image source={product.image} style={globalStyles.image} />
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={globalStyles.name}>{product.name}</Text>
          <Text style={globalStyles.price}>{product.price}</Text>
          
          <Animated.Text style={[globalStyles.description, { opacity: opacityAnim }]}>
            {product.description}
          </Animated.Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default ProductCard;
