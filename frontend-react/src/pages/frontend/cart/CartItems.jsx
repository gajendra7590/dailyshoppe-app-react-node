import React from 'react';
import { Link } from "react-router";
import toast from 'react-hot-toast';
import { updateToCart } from '../../../services/cartService';
import { useCartContextHook } from "../../../context/CartContext";

export default function CartItems({ orderSummary, setIsLoader, getOrderSummary }) {
    const { refreshCart } = useCartContextHook();
    const handleCartQunatity = async (index, action, item) => {
        try {
            setIsLoader(true);
            let cartItem_quantity = item.cartItem_quantity;
            let product_stock = item.product_stock;
            const newQuanity = action === "+" ? cartItem_quantity + 1 : cartItem_quantity - 1;
            const updateToCartRes = await updateToCart(item._id, { quantity: newQuanity });
            if (updateToCartRes?.success === true) {
                toast.success(updateToCartRes?.message);
                await refreshCart();
                await getOrderSummary();
            } else {
                const msg = updateToCartRes?.message || "Something went wrong";
                toast.error(msg);
            }
            setIsLoader(false);
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
            setIsLoader(false);
        }
    }


    return (
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">
                Shopping Cart
            </h2>
            <div className="space-y-4">
                {orderSummary?.cartItems?.length > 0 ? (
                    orderSummary?.cartItems?.map((item, index) => (
                        <div key={item._id} className="bg-white rounded-xl shadow p-4 flex gap-4" >
                            <img src={item?.product_image} alt={item?.product_name} className="w-24 h-24 rounded-lg object-cover" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item?.product_salePrice} </h3>
                                <p className="text-sm text-gray-500 mt-1"> Qty: {item?.cartItem_quantity} </p>
                                <p className="text-blue-600 font-bold mt-2"> ₹ {item?.cartItem_itemSubTotal?.toLocaleString()} </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => { handleCartQunatity(index, '-', item) }} className="border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"> - </button>
                                <span> {item?.cartItem_quantity} </span>
                                <button onClick={() => { handleCartQunatity(index, '+', item) }} className="border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"> + </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-7xl mb-4"> 🛒 </div>
                        <h2 className="text-3xl font-bold text-gray-800"> Your Cart is Empty</h2>
                        <p className="text-gray-500 mt-3">Looks like you haven't added any products yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Browse our products and start shopping.</p>
                        <Link to="/products" className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
