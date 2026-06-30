import toast from "react-hot-toast";
import { addToCart } from "../services/cartService";
import { useNavigate } from "react-router";

import { useCartContextHook } from "../context/CartContext";


export const useCart = () => {
    const navigate = useNavigate();
    const { refreshCart } = useCartContextHook();
    const handleAddToCart = async (reqParams) => {
        try {
            const response = await addToCart(reqParams);
            if (response?.success) {
                toast.success(response?.message);
                await refreshCart();
                navigate("/cart");
            } else {
                const msg = response?.message || "Something went wrong";
                toast.error(msg);
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
        }
    };
    return {
        handleAddToCart
    };
};