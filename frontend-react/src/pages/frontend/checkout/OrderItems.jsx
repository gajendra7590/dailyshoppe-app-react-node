import React from "react";
import { Truck, BadgeCheck } from "lucide-react";

export default function OrderItems() {

    const items = [
        {
            id: 1,
            name: "Apple iPhone 16 Pro",
            image: "https://placehold.co/100x100",
            sku: "IPH16PRO",
            price: 129999,
            salePrice: 124999,
            quantity: 1,
            stock: true
        },
        {
            id: 2,
            name: "Apple Watch Series 11",
            image: "https://placehold.co/100x100",
            sku: "AWS11",
            price: 49999,
            salePrice: 46999,
            quantity: 2,
            stock: true
        }
    ];

    return (

        <div className="bg-white rounded-xl shadow border mt-6">

            {/* Header */}

            <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-semibold">
                    Order Items
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Review your products before placing the order.
                </p>

            </div>

            {/* Products */}

            <div>

                {items.map((item) => (

                    <div
                        key={item.id}
                        className="p-6 border-b last:border-b-0"
                    >

                        <div className="flex gap-5">

                            {/* Image */}

                            <div>

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 rounded-lg border object-cover"
                                />

                            </div>

                            {/* Info */}

                            <div className="flex-1">

                                <h3 className="text-lg font-semibold">

                                    {item.name}

                                </h3>

                                <p className="text-gray-500 mt-1">

                                    SKU :
                                    {" "}
                                    {item.sku}

                                </p>

                                <div className="flex items-center gap-3 mt-3">

                                    <span className="text-xl font-bold text-blue-600">

                                        ₹ {item.salePrice.toLocaleString()}

                                    </span>

                                    <span className="text-gray-400 line-through">

                                        ₹ {item.price.toLocaleString()}

                                    </span>

                                </div>

                                <div className="flex items-center gap-4 mt-4">

                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">

                                        Qty :
                                        {" "}
                                        {item.quantity}

                                    </span>

                                    {item.stock && (

                                        <span className="flex items-center gap-1 text-green-600 text-sm">

                                            <BadgeCheck size={16} />

                                            In Stock

                                        </span>

                                    )}

                                </div>

                                <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">

                                    <Truck size={16} />

                                    Estimated Delivery :
                                    {" "}
                                    <span className="font-medium">

                                        Tomorrow

                                    </span>

                                </div>

                            </div>

                            {/* Total */}

                            <div className="text-right">

                                <p className="text-gray-500">

                                    Sub Total

                                </p>

                                <h3 className="text-2xl font-bold text-slate-800 mt-2">

                                    ₹ {(item.salePrice * item.quantity).toLocaleString()}

                                </h3>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}