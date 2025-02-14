import React, { createContext, useState, useContext } from 'react';


interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: any;
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (id: string) => {
        setCart(cart.filter((product) => product.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const Cart = () => {
    const { cart, addToCart, removeFromCart } = useCart();

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.price}
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default Cart;
