import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CartProvider } from "./cart";

export default function Layout() {
  return (
    <CartProvider>
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
        {/* 🚀 Hiding dynamic routes from the tab bar */}
        <Tabs.Screen
          name="product/[id]"
          options={{ href: null }} // This removes "product/[id]" from the tab bar
        />
      </Tabs>
    </CartProvider>
  );
}
