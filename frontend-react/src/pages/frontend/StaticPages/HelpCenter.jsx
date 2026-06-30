import React from 'react'

export default function HelpCenter() {
    return (
        <div className="max-w-4xl mx-auto py-12">

            <h1 className="text-4xl font-bold mb-8">
                Help Center
            </h1>

            <div className="space-y-4">

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="font-semibold">
                        How do I place an order?
                    </h3>

                    <p className="text-slate-600 mt-2">
                        Browse products, add items to cart,
                        and complete checkout.
                    </p>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="font-semibold">
                        How can I track my order?
                    </h3>

                    <p className="text-slate-600 mt-2">
                        Visit My Orders section after login.
                    </p>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="font-semibold">
                        What is your return policy?
                    </h3>

                    <p className="text-slate-600 mt-2">
                        Products can be returned within 7 days
                        of delivery.
                    </p>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="font-semibold">
                        Which payment methods are accepted?
                    </h3>

                    <p className="text-slate-600 mt-2">
                        UPI, Debit Card, Credit Card and Net Banking.
                    </p>

                </div>

            </div>

        </div>
    )
}
