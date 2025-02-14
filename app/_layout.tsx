import { Stack, Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import rect from "react";
import { CartProvider } from "./cart";


export default function Layout() {
  return (
    <CartProvider>
      <Stack>{

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
    </Tabs>
      }</Stack>
          </CartProvider>
  );
}
