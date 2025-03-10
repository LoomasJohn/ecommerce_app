import React, { createContext, useContext, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
  category: string;
}

interface ProductContextType {
  products: Product[];
  categories: string[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      description: "High performance laptop",
      price: 999,
      image: require("../assets/images/laptop.png"),
    },
    {
      id: 2,
      name: "Microsoft Office",
      category: "Software",
      description: "Productivity software",
      price: 149,
      image: require("../assets/images/software.png"),
    },
    {
      id: 3,
      name: "Headphones",
      category: "Electronics",
      description: "Noise-cancelling headphones",
      price: 199,
      image: require("../assets/images/headphones.png"),
    },
    {
      id: 4,
      name: "Printer",
      category: "Electronics",
      description: "All-in-one printer",
      price: 249,
      image: require("../assets/images/printer.png"),
    },
  ]);

  // Extract unique categories
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  return (
    <ProductContext.Provider value={{ products, categories }}>
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
