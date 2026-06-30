import { Link, useParams } from "react-router";
import { getProductDetail } from '../../services/productService';
import { use, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useCart } from "../../utils/addToCart";

function ProductDetail() {
    const [product, setProduct] = useState({});
    const [cartQnty, setCartQnty] = useState(0);
    const { pid } = useParams();

    const { handleAddToCart } = useCart();

    const getProduct = async () => {
        const result = await getProductDetail(pid);
        setProduct(result?.data)
    }

    const discountPercentage = () => {
        return product?.price > 0 ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;
    }

    const addToCartHandler = (product) => {
        console.log('addToCartHandler', product)

    }

    const byNowHandler = (product) => {
        console.log('byNowHandler', product)

    }

    useEffect(() => {
        getProduct();
    }, [pid]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-6">

                {/* Product Image */}

                <div className="relative">

                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[500px] object-cover rounded-xl border"
                    />

                    <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                        {discountPercentage()}% OFF
                    </span>

                </div>


                {/* Product Details */}
                <div>

                    <h1 className="text-4xl font-bold text-gray-900">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-3 mt-4">

                        <span className="text-4xl font-bold text-blue-600">
                            ₹{product.salePrice?.toLocaleString()}
                        </span>

                        <span className="text-xl line-through text-gray-400">
                            ₹{product.price?.toLocaleString()}
                        </span>

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {discountPercentage()}% OFF
                        </span>

                    </div>

                    <div className="mt-4">
                        {product?.stock > 0 ? <span className="text-green-600 font-semibold">
                            ✓ In Stock
                        </span> : <span className="text-red-600 font-semibold">
                            ✕ Out Of Stock
                        </span>}
                    </div>

                    <p className="mt-6 text-gray-600 leading-7">
                        {product.description}
                    </p>

                    <div className="mt-6 space-y-2 text-sm text-gray-500">

                        <p>
                            <strong>SKU:</strong> {product.sku}
                        </p>

                        <p>
                            <strong>Category:</strong> {product.category?.name}
                        </p>

                    </div>

                    {/* Quantity */}
                    <div className="mt-8 flex items-center gap-4">
                        <label className="font-medium">
                            Qty
                        </label>
                        <select
                            value={cartQnty}
                            onChange={(e) => setCartQnty(Number(e.target.value))}
                            className="w-24 border rounded-lg px-3 py-2"
                        >
                            {['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                                <option key={qty} value={qty}>
                                    {qty}
                                </option>
                            ))}
                        </select>                    </div>
                    {/* Buttons */}
                    <div className="mt-8 flex gap-4">
                        <button
                            disabled={(product?.stock > 0 && cartQnty > 0) ? false : true}
                            onClick={() => { handleAddToCart({ productId: product._id, quantity: cartQnty }) }}
                            className=" disabled:bg-gray-400 disabled:cursor-not-allowed flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                        >
                            {product?.stock > 0 ? 'Add To Cart' : 'Out Of Stock'}
                        </button>

                        <button
                            disabled={(product?.stock > 0 && cartQnty > 0) ? false : true}
                            onClick={() => { buyNowHandler(product) }}
                            className=" disabled:bg-gray-400 disabled:cursor-not-allowed flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
                        >
                            {product?.stock > 0 ? 'Buy Now' : 'Out Of Stock'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                <h2 className="text-2xl font-bold mb-4">
                    Product Description
                </h2>

                <p className="text-gray-600 leading-7">
                    {product.description}
                </p>

            </div>

        </div>
    );
}

export default ProductDetail;