import React, { createContext, useContext, useState } from "react";

// Define the product type
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: any;
}

// Context type
interface ProductContextType {
  products: Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products] = useState<Product[]>([
    { id: "1", name: "Laptop", description: "High performance laptop", price: "$999", image: require("../assets/images/laptop.png") },
    { id: "2", name: "Microsoft Office", description: "Productivity software", price: "$149", image: require("../assets/images/software.png") },
    { id: "3", name: "Headphones", description: "Noise-cancelling headphones", price: "$199", image: require("../assets/images/headphones.png") },
    { id: "4", name: "Printer", description: "All-in-one printer", price: "$249", image: require("../assets/images/printer.png") },
  ]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
