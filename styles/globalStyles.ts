import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  cartButtonContainer: {
    position: "absolute",
    bottom: 70, // Adjusted so it's above the navigation bar
    right: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0077cc",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  badge: { 
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { 
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "green",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
  },
});
