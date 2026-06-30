import React from "react";
import { Plus, Pencil, Trash2, MapPin, Phone } from "lucide-react";

export default function AddressList() {

    const addresses = [
        {
            id: 1,
            name: "Gajendra Singh",
            mobile: "9876543210",
            address: "B-102 Vijay Nagar",
            city: "Indore",
            state: "Madhya Pradesh",
            pincode: "452010",
            type: "Home",
            default: true
        },
        {
            id: 2,
            name: "Gajendra Singh",
            mobile: "9999999999",
            address: "ABC Tower, MG Road",
            city: "Indore",
            state: "Madhya Pradesh",
            pincode: "452001",
            type: "Office",
            default: false
        }
    ];

    return (

        <div className="bg-white rounded-xl shadow border">

            <div className="flex items-center justify-between px-6 py-5 border-b">

                <div>

                    <h2 className="text-xl font-semibold">
                        Delivery Address
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Select a delivery address
                    </p>

                </div>

                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"><Plus size={18} />
                    Add New Address
                </button>

            </div>

            <div className="p-6 space-y-5"> 
                {addresses.map((address) => ( 
                    <label
                        key={address.id}
                        className="block border rounded-xl p-5 cursor-pointer hover:border-blue-500 transition"
                    >

                        <div className="flex justify-between">

                            <div className="flex gap-4">

                                <input
                                    type="radio"
                                    name="address"
                                    className="mt-1"
                                    defaultChecked={address.default}
                                />

                                <div>

                                    <div className="flex items-center gap-3">

                                        <h3 className="font-semibold text-lg">

                                            {address.name}

                                        </h3>

                                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">

                                            {address.type}

                                        </span>

                                        {address.default && (

                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">

                                                Default

                                            </span>

                                        )}

                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600 mt-3">

                                        <Phone size={16} />

                                        {address.mobile}

                                    </div>

                                    <div className="flex items-start gap-2 text-gray-600 mt-2">

                                        <MapPin
                                            size={17}
                                            className="mt-0.5"
                                        />

                                        <div>

                                            {address.address}

                                            <br />

                                            {address.city},
                                            {" "}
                                            {address.state}
                                            {" - "}
                                            {address.pincode}

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="flex gap-2">

                                <button
                                    type="button"
                                    className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center cursor-pointer"
                                >

                                    <Pencil size={18} />

                                </button>

                                <button
                                    type="button"
                                    className="h-10 w-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center cursor-pointer"
                                >

                                    <Trash2 size={18} />

                                </button>

                            </div>

                        </div>

                    </label>

                ))}

            </div>

        </div>

    );

}