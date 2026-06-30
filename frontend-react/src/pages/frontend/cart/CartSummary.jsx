import React from 'react';
import { Link, redirect, useNavigate } from "react-router";

export default function CartSummary({ orderSummary, setIsLoader }) {
    const navigate = useNavigate();
    const isDisabled = orderSummary?.totalItems <= 0;
    const proceedToCheckout = () => {
        navigate("/checkout");
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                    <span>Total Items</span>
                    <span>{orderSummary?.totalItems}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹ {orderSummary?.subTotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span> ₹ {orderSummary?.shippingTotal?.toLocaleString()} </span>
                </div>
                <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span> - ₹ {orderSummary?.extraDiscountTotal?.toLocaleString() || 0} </span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-xl">
                    <span>Grand Total</span>
                    <span> ₹ {orderSummary?.grandTotal?.toLocaleString()} </span>
                </div>
            </div>
            <button disabled={isDisabled} onClick={proceedToCheckout}
                className={`w-full mt-6 py-3 rounded-lg font-medium transition ${isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    }`}
            >Proceed To Checkout</button>
            <Link to="/products" className="block text-center mt-3 text-blue-600 hover:underline">
                Continue Shopping
            </Link>
        </div>
    )
}
