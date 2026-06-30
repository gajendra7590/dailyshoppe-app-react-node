import { use, useState } from 'react';
import { filterByCategories } from '../../../services/homeService';

const filterByCategoriesAsyc = filterByCategories();

export default function ProductSidebar({ search, category }) {
    const categoriesList = use(filterByCategoriesAsyc);
    return (
        <aside className="bg-white p-5 rounded-xl shadow h-fit">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            <div className="space-y-4">
                <div>
                    <label className="font-medium block mb-2">Search</label>
                    <input onChange={(e) => {
                        const value = e.target.value;
                        if (value.length > 0 && value.length < 3) { return; }
                        search.setSearch(value);
                    }} type="text" placeholder="Search..." className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                    <label className="font-medium block mb-2">Category</label>
                    <select value={category.categoryId} onChange={(e) => category.setCategoryId(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                        <option value=''>All</option>
                        {categoriesList?.data.map((category) => {
                            return (<option key={category._id} value={category._id}>{category.name}</option>)
                        })}
                    </select>
                </div>
            </div>
        </aside>
    )
}
