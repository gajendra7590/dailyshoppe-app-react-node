import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function DashboardAnalytics() {

    const data = [
        {
            month: "Jan",
            sales: 120000
        },
        {
            month: "Feb",
            sales: 180000
        },
        {
            month: "Mar",
            sales: 140000
        },
        {
            month: "Apr",
            sales: 220000
        },
        {
            month: "May",
            sales: 280000
        },
        {
            month: "Jun",
            sales: 350000
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-xl font-bold">
                        Sales Analytics
                    </h2>

                    <p className="text-gray-500">
                        Last 6 Months Revenue
                    </p>

                </div>

            </div>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart data={data}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(value) =>
                            `₹ ${value.toLocaleString()}`
                        }
                    />

                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#2563EB"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    )
}
