import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "../cart";
import { useProducts } from "../ProductContext"; // Import Product Context

const ProductPage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { products } = useProducts(); // Fetch products from context

    const product = products.find((p) => p.id === String(id));

    if (!product) {
        return <Text>Product not found</Text>;
    }

    const handleAddToCart = () => {
        Alert.alert("Added to Cart", `${product.name} has been added to your cart.`);
        addToCart({ id: product.id, name: product.name, description: product.description, price: product.price, image: product.image, quantity: 1 });
        router.push("/cart");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            <Image source={product.image} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>{product.price}</Text>

            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Add to Shopping Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
    },
    backButton: {
        alignSelf: "flex-start",
        marginBottom: 10,
        padding: 10,
    },
    backText: {
        fontSize: 16,
        color: "#0077cc",
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 8,
    },
    price: {
        fontSize: 18,
        color: "green",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#0077cc",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ProductPage;
