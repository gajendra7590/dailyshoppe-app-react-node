import { Link, useParams, useLocation } from "react-router";
import ProductSidebar from "./ProductSidebar";
import { getAllProductList } from '../../../services/productService';
import { use, useState, useEffect } from "react";
import { useCart } from "../../../utils/addToCart";

function ProductList() {
    //SHORTING
    const [sortByVal, setSortByVal] = useState('');
    const [sortBy, setSortBy] = useState('_id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [navCat, setNavCat] = useState('');

    const { catId } = useParams();
    const { handleAddToCart } = useCart();

    useEffect(() => {
        if (navCat != location.pathname) {
            setNavCat(location.pathname);
            setCategoryId(catId)
        }
        fetchProducts();
        setHasMore(true);
        setPage(1)
    }, [search, sortBy, sortByVal, categoryId, location.pathname]);

    const fetchProducts = async () => {
        const result = await getAllProductList({ search, sortBy, sortOrder, categoryId, page, limit });
        if (result?.data?.products?.length > 0) {
            setProducts(result?.data?.products);
        } else {
            setHasMore(false);
            setPage(1);
            setProducts([]);
        }
    };

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        console.log(page)
        console.log(nextPage)
        const result = await getAllProductList({ search, sortBy, sortOrder, categoryId, page: nextPage, limit });
        if (result?.data?.products?.length > 0) {
            setProducts((prev) => [...prev, ...result.data.products]);
            setPage(nextPage);
        } else {
            setHasMore(false);
        }
    }

    const handleSortChange = (e) => {
        setSortByVal(e.target.value);
        switch (e.target.value) {
            case 'latest':
                setSortBy('_id');
                setSortOrder('desc');
                break;
            case 'price_low_to_high':
                setSortBy('salePrice');
                setSortOrder('asc');
                break;
            case 'price_high_to_low':
                setSortBy('salePrice');
                setSortOrder('desc');
                break;
        }
    };

    return (
        <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <ProductSidebar search={{ search, setSearch }} category={{ categoryId, setCategoryId }} />
            {/* Products */}
            <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Products</h2>
                    <select value={sortByVal}
                        onChange={handleSortChange} className="border rounded-lg px-3 py-2">
                        <option value='latest'>Latest</option>
                        <option value="price_low_to_high">Price Low To High</option>
                        <option value="price_high_to_low">Price High To Low</option>
                    </select>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {
                        products.length == 0 && <div className="col-span-full text-center py-16">

                            <h3 className="text-2xl font-semibold text-gray-700">
                                No Products Found
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Try changing your search or category filter.
                            </p>

                        </div>
                    }
                    {products.length > 0 && products.map(product => (
                        <div key={product._id} className="bg-white rounded-xl shadow overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">

                                    <span className="text-xl font-bold text-blue-600">
                                        ₹{product.salePrice?.toLocaleString()}
                                    </span>

                                    <span className="text-sm text-gray-500 line-through">
                                        ₹{product.price?.toLocaleString()}
                                    </span>

                                    <span className="text-sm font-medium text-green-600">
                                        {Math.round(
                                            ((product.price - product.salePrice) /
                                                product.price) *
                                            100
                                        )}
                                        % OFF
                                    </span>

                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Link to={`/product/${product.slug}/${product._id}`} className="flex-1 border text-center py-2 rounded-lg">
                                        View
                                    </Link>
                                    <button onClick={() => { handleAddToCart({ productId: product._id, quantity: 1 }) }} disabled={!hasMore} className="flex-1 bg-blue-600 text-white rounded-lg cursor-pointer">
                                        Add Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && <div className="mt-8 text-center">
                    <button onClick={handleLoadMore} className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer">
                        {hasMore ? 'LOAD MORE' : 'NO MORE PRODUCTS'}
                    </button>
                </div>
                }
            </div>
        </div >
    );
}

export default ProductList;