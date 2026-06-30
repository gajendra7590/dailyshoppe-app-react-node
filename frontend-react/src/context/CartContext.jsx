import { createContext, useContext, useEffect, useState } from "react";
import { getCartItemsCount } from "../services/cartService";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const refreshCart = async () => {
        try {
            const response = await getCartItemsCount();
            if (response?.success) {
                setCartCount(response.data.cartCount || 0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { refreshCart(); }, []);

    return (
        <CartContext.Provider value={{ cartCount, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContextHook = () => useContext(CartContext);