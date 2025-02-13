import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ProductPage = () => {
    const { id } = useLocalSearchParams(); 

    // Mock product data (Replace this with an API call if needed)
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

    return (
        <View style={styles.container}>
            <Image source={product.image} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>{product.price}</Text>
            <Button title="Add to Cart" onPress={() => alert("Added to cart")} />
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
});

export default ProductPage;
