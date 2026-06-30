import React from 'react'

export default function Support() {
    return (
        <div className="max-w-6xl mx-auto py-12">

            <h1 className="text-4xl font-bold mb-8">
                Customer Support
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-bold mb-2">
                        Order Support
                    </h3>

                    <p>
                        Questions regarding orders and shipping.
                    </p>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-bold mb-2">
                        Returns & Refunds
                    </h3>

                    <p>
                        Return products and request refunds.
                    </p>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-bold mb-2">
                        Account Help
                    </h3>

                    <p>
                        Login, registration and account issues.
                    </p>

                </div>

            </div>

        </div>
    )
}
