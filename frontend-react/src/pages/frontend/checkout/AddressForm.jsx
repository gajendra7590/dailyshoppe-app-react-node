import React from "react";

export default function AddressForm() {

    return (

        <div className="bg-white rounded-xl shadow border mt-6">

            <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-semibold">
                    Add New Address
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Please enter your delivery address.
                </p>

            </div>

            <div className="p-6">

                {/* Row 1 */}

                <div className="grid md:grid-cols-2 gap-5">

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="9876543210"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                </div>

                {/* Row 2 */}

                <div className="grid md:grid-cols-2 gap-5 mt-5">

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Alternate Mobile
                        </label>

                        <input
                            type="text"
                            placeholder="Optional"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Pincode <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="452001"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                </div>

                {/* Address */}

                <div className="mt-5">

                    <label className="block text-sm font-medium mb-2">
                        Address Line 1 <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        rows="3"
                        placeholder="House No, Building, Street"
                        className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                </div>

                <div className="mt-5">

                    <label className="block text-sm font-medium mb-2">
                        Address Line 2
                    </label>

                    <textarea
                        rows="2"
                        placeholder="Apartment, Area, Landmark"
                        className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                </div>

                {/* Row */}

                <div className="grid md:grid-cols-3 gap-5 mt-5">

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Landmark
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            City <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            State <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                </div>

                {/* Row */}

                <div className="grid md:grid-cols-2 gap-5 mt-5">

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Country
                        </label>

                        <input
                            type="text"
                            defaultValue="India"
                            readOnly
                            className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Address Type
                        </label>

                        <select className="w-full border rounded-lg px-4 py-3">

                            <option>Home</option>

                            <option>Office</option>

                            <option>Other</option>

                        </select>

                    </div>

                </div>

                {/* Default */}

                <div className="flex items-center gap-3 mt-6">

                    <input
                        type="checkbox"
                        className="w-5 h-5"
                    />

                    <label className="text-sm">
                        Make this my default address
                    </label>

                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-3 mt-8 border-t pt-6">

                    <button
                        type="button"
                        className="px-6 py-3 rounded-lg border hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                        Save Address
                    </button>

                </div>

            </div>

        </div>

    );

}