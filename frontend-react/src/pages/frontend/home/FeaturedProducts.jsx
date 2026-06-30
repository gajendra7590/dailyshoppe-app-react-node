import { use, useEffect, useState, Suspense } from "react";
import { Link } from 'react-router';
import { getFeaturedProducts } from "../../../services/homeService";
import { useCart } from "../../../utils/addToCart";

const getFeaturedProductsPromise = getFeaturedProducts();

export default function FeaturedProducts() {
    const products = use(getFeaturedProductsPromise);
    const { handleAddToCart } = useCart();

    const submitAddToCartHandler = (product) => {
        alert('submit, will do it later')
        console.log(product)
    }

    const discountPercentage = (product) => {
        return Math.round(
            ((product.price - product.salePrice) /
                product.price) *
            100
        );
    }

    return (
        < section >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                    Featured Products
                </h2>
                <Link to="/products" className="text-blue-600">
                    View All
                </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products?.data.map((product) => (
                    <div key={product._id} className="bg-white rounded-2xl shadow overflow-hidden">
                        <Link to={`/product/${product.slug}/${product._id}`}>
                            <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                        </Link>

                        <div className="p-4">
                            <Link to={`/product/${product.slug}/${product._id}`}>
                                <h3 className="font-semibold text-lg line-clamp-2 min-h-[56px]">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">

                                    <span className="text-blue-600 font-bold text-xl">
                                        ₹{product.salePrice.toLocaleString()}
                                    </span>

                                    {product.salePrice < product.price && (
                                        <span className="text-gray-400 line-through text-sm">
                                            ₹{product.price.toLocaleString()}
                                        </span>
                                    )}

                                </div>
                            </Link>
                            <button onClick={() => { handleAddToCart({ productId: product._id, quantity: 1 }) }} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg cursor-pointer">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section >
    )
}
