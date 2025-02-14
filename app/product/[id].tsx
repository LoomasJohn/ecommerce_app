import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCart, CartProvider } from '../cart';


const ProductPage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();

    // Mock product data
    const products = [
        { id: "1", name: "Laptop", description: "High performance laptop", price: "$999", image: require("../../assets/images/laptop.png") },
        { id: "2", name: "Microsoft Office", description: "Productivity software", price: "$149", image: require("../../assets/images/software.png") },
        { id: "3", name: "Headphones", description: "Noise-cancelling headphones", price: "$199", image: require("../../assets/images/headphones.png") },
        { id: "4", name: "Printer", description: "All-in-one printer", price: "$249", image: require("../../assets/images/printer.png") },
    ];

    const product = products.find((p) => p.id === id);

    if (!product) {
        return <Text>Product not found</Text>;
    }

    const handleAddToCart = () => {
        Alert.alert("Added to Cart", `${product.name} has been added to your cart.`);
        addToCart({ id: product.id, name: product.name, description: product.description,  price: product.price, image: product.image });
        router.push("/cart");
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
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
