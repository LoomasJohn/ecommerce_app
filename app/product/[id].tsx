import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useCart } from "../cart";
import { useProducts } from "../ProductContext"; 
import { globalStyles } from "../../styles/globalStyles"; 
import { useEffect } from "react";

const ProductPage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation(); // ✅ Access navigation
    const { addToCart } = useCart();
    const { products } = useProducts(); 

    const product = products.find((p) => p.id === String(id));

    useEffect(() => {
        if (product) {
            navigation.setOptions({ title: product.name }); // ✅ Set title dynamically
        }
    }, [product, navigation]);

    if (!product) {
        return <Text>Product not found</Text>;
    }

    const handleAddToCart = () => {
        Alert.alert("Added to Cart", `${product.name} has been added to your cart.`);
        addToCart({ id: product.id, name: product.name, description: product.description, price: product.price, image: product.image, quantity: 1 });
        router.push("/cart");
    };

    return (
        <View style={globalStyles.container}>
            <TouchableOpacity style={globalStyles.button} onPress={() => router.back()}>
                <Text style={globalStyles.buttonText}>← Back</Text>
            </TouchableOpacity>

            <Image source={product.image} style={globalStyles.image} />
            <Text style={globalStyles.name}>{product.name}</Text>
            <Text style={globalStyles.description}>{product.description}</Text>
            <Text style={globalStyles.price}>{product.price}</Text>

            <TouchableOpacity style={globalStyles.button} onPress={handleAddToCart}>
                <Text style={globalStyles.buttonText}>Add to Shopping Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProductPage;
