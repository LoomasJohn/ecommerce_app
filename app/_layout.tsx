import React, { useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CartProvider } from "./cart";
import { ProductProvider } from "./ProductContext";
import CartButton from "../components/CartButton";
import { View, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";


export default function Layout() {
  return (
    <ProductProvider>
      <CartProvider>
        <View style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              tabBarStyle: globalStyles.navBar, 
              tabBarActiveTintColor: "#fff",
              tabBarInactiveTintColor: "#ddd",
              headerStyle: { backgroundColor: "#0077cc" },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              tabBarLabelStyle: globalStyles.tabBarLabel,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => {
                  const [hovered, setHovered] = useState(false);
                  return (
                    <Pressable
                      onHoverIn={() => setHovered(true)}
                      onHoverOut={() => setHovered(false)}
                      style={{ opacity: hovered ? 0.6 : 1 }} //Uses state-based opacity
                    >
                      <Ionicons name="home" size={size} color={color} />
                    </Pressable>
                  );
                },
              }}
            />
            <Tabs.Screen
              name="cart"
              options={{
                title: "Cart",
                tabBarIcon: ({ color, size }) => {
                  const [hovered, setHovered] = useState(false);
                  return (
                    <Pressable
                      onHoverIn={() => setHovered(true)}
                      onHoverOut={() => setHovered(false)}
                      style={{ opacity: hovered ? 0.6 : 1 }}
                    >
                      <Ionicons name="cart" size={size} color={color} />
                    </Pressable>
                  );
                },
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ color, size }) => {
                  const [hovered, setHovered] = useState(false);
                  return (
                    <Pressable
                      onHoverIn={() => setHovered(true)}
                      onHoverOut={() => setHovered(false)}
                      style={{ opacity: hovered ? 0.6 : 1 }}
                    >
                      <Ionicons name="person" size={size} color={color} />
                    </Pressable>
                  );
                },
              }}
            />
            <Tabs.Screen name="product/[id]" options={{ href: null }} />
          </Tabs>

          {/* Wrap CartButton in a floating container */}
          <View style={globalStyles.cartButtonContainer}>
            <CartButton />
          </View>
        </View>
      </CartProvider>
    </ProductProvider>
  );
}
