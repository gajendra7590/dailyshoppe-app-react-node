import { use, useEffect, useState, Suspense } from "react";
import { Link } from "react-router";
import { getShopByCategories, getFeaturedProducts } from "../../../services/homeService";

//HOME SUB COMPNENTS
import DiscoveringSection from "./DiscoveringSection";
import ShopByCategorySection from "./ShopByCategorySection";
import FeaturedProducts from "./FeaturedProducts";
import WhyChooseUs from "./WhyChooseUs";
import NewsLetterSection from "./NewsLetterSection";

function Home() {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <DiscoveringSection />

            {/* Categories */}
            <ShopByCategorySection />

            {/* Featured Products */}
            <FeaturedProducts />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Newsletter */}
            <NewsLetterSection />
        </div >
    );
}

export default Home;