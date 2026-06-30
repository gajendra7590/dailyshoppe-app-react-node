import { use, useEffect, useState, Suspense } from "react";
import { Outlet, Link } from "react-router";
import { getHeaderCategories } from "../../../services/homeService.js";

const categoriesPromise = getHeaderCategories();

export default function CategoriesNavbar() {
    const categories = use(categoriesPromise);
    return (
        <div className="bg-white border-b">
            <div className="container mx-auto px-4">
                <div className="flex gap-6 h-12 items-center">
                    <Suspense fallback={<div>Loading...</div>}>
                        {categories.data.map((item) => (
                            <Link to={`/products/${item.slug}/${item._id}`} key={item._id}> {item.name} </Link>
                        ))}
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
