import React from "react";
import {
    TicketPercent,
    Truck,
    ShieldCheck,
    BadgePercent
} from "lucide-react";

export default function OrderSummary() {

    return (

        <div className="sticky top-6">

            <div className="bg-white rounded-xl shadow border overflow-hidden">

                {/* Header */}

                <div className="px-6 py-5 border-b">

                    <h2 className="text-xl font-semibold">
                        Order Summary
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Review your order details.
                    </p>

                </div>

                {/* Coupon */}

                <div className="p-6 border-b">

                    <label className="flex items-center gap-2 font-medium mb-3">

                        <TicketPercent
                            size={18}
                            className="text-blue-600"
                        />

                        Apply Coupon

                    </label>

                    <div className="flex gap-3">

                        <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg cursor-pointer"
                        >

                            Apply

                        </button>

                    </div>

                </div>

                {/* Summary */}

                <div className="p-6 space-y-4">

                    <div className="flex justify-between">

                        <span className="text-gray-600">

                            Total Items

                        </span>

                        <span className="font-semibold">

                            3

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-600">

                            Sub Total

                        </span>

                        <span className="font-semibold">

                            ₹ 2,18,997

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="flex items-center gap-2 text-gray-600">

                            <Truck size={17} />

                            Shipping

                        </span>

                        <span className="text-green-600 font-semibold">

                            FREE

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="flex items-center gap-2 text-gray-600">

                            <BadgePercent size={17} />

                            Discount

                        </span>

                        <span className="text-red-600 font-semibold">

                            - ₹5,000

                        </span>

                    </div>

                    <hr />

                    <div className="flex justify-between text-2xl font-bold">

                        <span>

                            Grand Total

                        </span>

                        <span className="text-blue-600">

                            ₹ 2,13,997

                        </span>

                    </div>

                </div>

                {/* Security */}

                <div className="px-6 py-4 bg-gray-50 border-y">

                    <div className="flex items-center gap-3">

                        <ShieldCheck
                            size={20}
                            className="text-green-600"
                        />

                        <p className="text-sm text-gray-600">

                            100% Secure Payment
                            <br />
                            SSL Encrypted Checkout

                        </p>

                    </div>

                </div>

                {/* Button */}

                <div className="p-6">

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition cursor-pointer"
                    >

                        Place Order

                    </button>

                    <p className="text-center text-xs text-gray-500 mt-4">

                        By placing this order you agree to our
                        Terms & Conditions and Privacy Policy.

                    </p>

                </div>

            </div>

        </div>

    );

}