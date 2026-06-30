import React from "react";
import { Banknote, CreditCard, ShieldCheck } from "lucide-react";

export default function PaymentMethod() {

    return (

        <div className="bg-white rounded-xl shadow border mt-6">

            <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-semibold">
                    Payment Method
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Select your preferred payment option.
                </p>

            </div>

            <div className="p-6 space-y-5">

                {/* Cash On Delivery */}

                <label className="flex items-start gap-4 border rounded-xl p-5 cursor-pointer hover:border-blue-500 transition">

                    <input
                        type="radio"
                        name="paymentMethod"
                        defaultChecked
                        className="mt-1"
                    />

                    <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">

                        <Banknote
                            size={24}
                            className="text-green-600"
                        />

                    </div>

                    <div className="flex-1">

                        <h3 className="font-semibold text-lg">

                            Cash On Delivery

                        </h3>

                        <p className="text-gray-500 mt-1">

                            Pay in cash when your order is delivered.

                        </p>

                    </div>

                </label>

                {/* Razorpay */}

                <label className="flex items-start gap-4 border rounded-xl p-5 cursor-pointer hover:border-blue-500 transition">

                    <input
                        type="radio"
                        name="paymentMethod"
                        className="mt-1"
                    />

                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">

                        <CreditCard
                            size={24}
                            className="text-blue-600"
                        />

                    </div>

                    <div className="flex-1">

                        <h3 className="font-semibold text-lg">

                            Razorpay

                        </h3>

                        <p className="text-gray-500 mt-1">

                            UPI, Debit Card, Credit Card,
                            Wallets & Net Banking.

                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">

                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                UPI
                            </span>

                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Visa
                            </span>

                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Mastercard
                            </span>

                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                RuPay
                            </span>

                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Net Banking
                            </span>

                        </div>

                    </div>

                </label>

            </div>

            {/* Security */}

            <div className="border-t bg-gray-50 px-6 py-4 rounded-b-xl">

                <div className="flex items-center gap-3">

                    <ShieldCheck
                        size={20}
                        className="text-green-600"
                    />

                    <p className="text-sm text-gray-600">

                        Your payment information is encrypted and securely processed.

                    </p>

                </div>

            </div>

        </div>

    );

}