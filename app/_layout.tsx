import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CartProvider } from "./cart";
import { ProductProvider } from "./ProductContext";
import CartButton from "../components/CartButton";
import { View, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <ProductProvider>
      <CartProvider>
        <View style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              tabBarStyle: { backgroundColor: "#0077cc" },
              tabBarActiveTintColor: "#fff",
              tabBarInactiveTintColor: "#ddd",
              headerStyle: { backgroundColor: "#0077cc" },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
              }}
            />
            <Tabs.Screen
              name="cart"
              options={{
                title: "Cart",
                tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
              }}
            />
            <Tabs.Screen name="product/[id]" options={{ href: null }} />
          </Tabs>

          {/*Wrap CartButton in a floating container */}
          <View style={styles.cartButtonContainer}>
            <CartButton />
          </View>
        </View>
      </CartProvider>
    </ProductProvider>
  );
}

const styles = StyleSheet.create({
  cartButtonContainer: {
    position: "absolute",
    bottom: 70, //Adjusted so it's above the navigation bar
    right: 20,
  },
});
