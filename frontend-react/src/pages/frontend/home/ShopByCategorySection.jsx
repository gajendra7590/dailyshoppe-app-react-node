import { use, useEffect, useState, Suspense } from "react";
import { Link } from 'react-router';
import { getShopByCategories } from "../../../services/homeService";

const getShopByCategoryPromise = getShopByCategories();

export default function ShopByCategorySection() {

    const categories = use(getShopByCategoryPromise);

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                    Shop By Category
                </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories?.data?.map((category) => (

                    <div key={category._id} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                        <Link to={`products/${category?.slug}/${category?._id}`}>
                            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl mb-4">
                                <img style={{ borderRadius: '50%', height: '80px', width: '100px' }} src={category.image} />
                            </div>
                            <h3 className="font-semibold text-lg">
                                {category.name}
                            </h3>
                        </Link>
                    </div>

                ))}

            </div>

        </section >
    )
}
