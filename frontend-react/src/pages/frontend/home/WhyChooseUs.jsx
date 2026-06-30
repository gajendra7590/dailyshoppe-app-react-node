import React from 'react'

export default function WhyChooseUs() {
    return (
        < section className="bg-white rounded-3xl p-10 shadow" >

            <h2 className="text-3xl font-bold text-center mb-10">
                Why Choose Us
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        🚚
                    </div>

                    <h3 className="font-bold text-xl">
                        Free Shipping
                    </h3>

                    <p className="text-slate-500 mt-2">
                        Free delivery on all orders.
                    </p>

                </div>

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        💳
                    </div>

                    <h3 className="font-bold text-xl">
                        Secure Payments
                    </h3>

                    <p className="text-slate-500 mt-2">
                        Safe and trusted payment gateway.
                    </p>

                </div>

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        🔄
                    </div>

                    <h3 className="font-bold text-xl">
                        Easy Returns
                    </h3>

                    <p className="text-slate-500 mt-2">
                        Hassle-free return process.
                    </p>

                </div>

            </div>

        </section >
    )
}
