import React from 'react';
import { ShoppingBag, Users, Package, IndianRupee } from "lucide-react";


export default function DashboardStates() {

    const stats = [
        {
            title: "Revenue",
            value: "₹5,40,000",
            icon: <IndianRupee size={28} />,
            growth: "+12%"
        },
        {
            title: "Orders",
            value: "1,250",
            icon: <ShoppingBag size={28} />,
            growth: "+8%"
        },
        {
            title: "Products",
            value: "450",
            icon: <Package size={28} />,
            growth: "+5%"
        },
        {
            title: "Customers",
            value: "980",
            icon: <Users size={28} />,
            growth: "+15%"
        }
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {stats.map((item, index) => (

                <div
                    key={index}
                    className="bg-white rounded-2xl shadow-sm p-6"
                >

                    <div className="flex justify-between">

                        <div>
                            <p className="text-gray-500">
                                {item.title}
                            </p>

                            <h3 className="text-3xl font-bold mt-2">
                                {item.value}
                            </h3>

                            <p className="text-green-600 text-sm mt-2">
                                {item.growth}
                            </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl">
                            {item.icon}
                        </div>

                    </div>

                </div>

            ))}

        </div>
    )
}
