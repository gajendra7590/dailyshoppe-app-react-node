import React from 'react'
import { Link } from 'react-router';
import { isLoggedIn, getUser } from "../../../utils/auth";

export default function DiscoveringSection() {
    const loggedIn = isLoggedIn();
    return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white overflow-hidden">
            <div className="grid lg:grid-cols-2 items-center p-10 lg:p-16">
                <div>
                    <h1 className="text-5xl font-bold leading-tight">
                        Discover Amazing
                        <br />
                        Products Online
                    </h1>
                    <p className="mt-6 text-lg text-blue-100">
                        Shop electronics, fashion,
                        accessories and much more
                        at unbeatable prices.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <Link to="/products" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold">
                            Shop Now
                        </Link>
                        <Link to={loggedIn ? '/profile' : 'login'} className="border border-white px-6 py-3 rounded-xl">
                            Create Account
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center">
                    <img src="https://picsum.photos/500/350" alt="Hero" className="rounded-2xl shadow-2xl" />
                </div>
            </div>

        </section>
    )
}
