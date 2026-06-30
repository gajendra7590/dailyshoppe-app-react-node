import React from 'react'

export default function AboutUs() {
    return (
        <div className="max-w-6xl mx-auto py-12" >

            <h1 className="text-4xl font-bold mb-6">
                About Us
            </h1>

            <p className="text-slate-600 leading-8">
                Welcome to ShopEase, your trusted online shopping destination.
                We provide high-quality products across Electronics,
                Fashion, Home & Kitchen, and many other categories.
            </p>

            <p className="text-slate-600 leading-8 mt-4">
                Our mission is to deliver premium products at affordable
                prices while ensuring a smooth shopping experience.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="font-bold text-xl mb-2">
                        Quality Products
                    </h3>

                    <p>
                        Carefully selected products from trusted brands.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="font-bold text-xl mb-2">
                        Fast Delivery
                    </h3>

                    <p>
                        Quick and reliable delivery service.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="font-bold text-xl mb-2">
                        Customer Support
                    </h3>

                    <p>
                        Dedicated support team ready to help.
                    </p>
                </div>

            </div>

        </div >
    )
}
