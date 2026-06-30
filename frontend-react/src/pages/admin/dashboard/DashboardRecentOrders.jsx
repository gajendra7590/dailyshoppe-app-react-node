import React from 'react';

export default function DashboardRecentOrders() {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

            <div className="flex justify-between items-center mb-4">

                <h2 className="font-semibold text-xl">
                    Recent Orders
                </h2>

                <button className="text-blue-600 cursor-pointer">
                    View All
                </button>

            </div>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">
                            Order
                        </th>

                        <th className="text-left py-3">
                            Customer
                        </th>

                        <th className="text-left py-3">
                            Amount
                        </th>

                        <th className="text-left py-3">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr className="border-b">
                        <td className="py-3">
                            #1001
                        </td>
                        <td>
                            Gajendra
                        </td>
                        <td>
                            ₹3,200
                        </td>
                        <td>
                            Delivered
                        </td>
                    </tr>

                    <tr className="border-b">
                        <td className="py-3">
                            #1002
                        </td>
                        <td>
                            Amit
                        </td>
                        <td>
                            ₹1,800
                        </td>
                        <td>
                            Pending
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>
    )
}
