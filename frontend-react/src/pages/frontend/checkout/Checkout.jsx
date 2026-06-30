import { useState } from "react";

import AddressList from "./AddressList";
import AddressForm from "./AddressForm";
import PaymentMethod from "./PaymentMethod";
import OrderItems from "./OrderItems";
import OrderSummary from "./OrderSummary";

export default function Checkout() {

    const [showAddressForm, setShowAddressForm] = useState(false);

    return (

        <div className="bg-gray-100 min-h-screen py-8">

            <div className="max-w-7xl mx-auto px-4">

                {/* Breadcrumb */}

                <div className="mb-6">

                    <p className="text-sm text-gray-500">

                        Home

                        <span className="mx-2">
                            /
                        </span>

                        Cart

                        <span className="mx-2">
                            /
                        </span>

                        <span className="text-blue-600 font-medium">
                            Checkout
                        </span>

                    </p>

                </div>

                {/* Page Heading */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">

                        Checkout

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Complete your purchase securely.

                    </p>

                </div>

                {/* Main Grid */}

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left */}

                    <div className="lg:col-span-2">

                        {/* Address */}

                        <AddressList />

                        {/* Add Address */}
                        <div className="bg-white rounded-xl shadow border mt-6">
                            <div className="flex items-center justify-between px-6 py-5">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        New Delivery Address
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Add another delivery address.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowAddressForm(!showAddressForm)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition cursor-pointer">
                                    {showAddressForm ? "Hide Form" : "+ Add Address"}
                                </button>

                            </div>

                            <div
                                className={`overflow-hidden transition-all duration-500 ${showAddressForm
                                    ? "max-h-[1500px] opacity-100 border-t"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >

                                <div className="p-6">

                                    <AddressForm />

                                </div>

                            </div>

                        </div>

                        {/* Payment */}

                        <PaymentMethod />

                        {/* Products */}

                        <OrderItems />

                    </div>

                    {/* Right */}

                    <div>

                        <OrderSummary />

                    </div>

                </div>

            </div>

        </div>

    );

}