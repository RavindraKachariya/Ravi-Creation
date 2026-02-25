import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);

    const [showFilter, setShowFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relevant");

    // Toggle Category
    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    // Toggle SubCategory
    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    // Combined Filter + Sort Logic
    useEffect(() => {
        if (!products || products.length === 0) return;

        let updatedProducts = [...products];

        // Search Filter
        if (showSearch && search) {
            updatedProducts = updatedProducts.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Category Filter
        if (category.length > 0) {
            updatedProducts = updatedProducts.filter((item) =>
                category.includes(item.category)
            );
        }

        // SubCategory Filter
        if (subCategory.length > 0) {
            updatedProducts = updatedProducts.filter((item) =>
                subCategory.includes(item.subcategory)
            );
        }

        // Sorting
        if (sortType === "low-high") {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === "high-low") {
            updatedProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(updatedProducts);
    }, [products, category, subCategory, search, showSearch, sortType]);

    return (
        <div className="px-4 sm:px-10 pt-10 border-t">

            <div className="flex flex-col lg:flex-row gap-10">

                {/* LEFT FILTER PANEL */}
                <div className="lg:w-64">

                    <div
                        onClick={() => setShowFilter(!showFilter)}
                        className="flex justify-between items-center cursor-pointer lg:cursor-default"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">
                            Filters
                        </h2>
                        <img
                            className={`h-3 lg:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
                            src={assets.dropdown_icon}
                            alt=""
                        />
                    </div>

                    <div className={`${showFilter ? "block" : "hidden"} lg:block mt-6 space-y-6`}>

                        {/* CATEGORY */}
                        <div className="bg-white rounded-2xl shadow-sm p-5">
                            <p className="mb-4 text-sm font-semibold text-gray-800">
                                Categories
                            </p>

                            <div className="flex flex-col gap-3 text-sm text-gray-700">
                                {["Car Hanger"].map((item) => (
                                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={item}
                                            onChange={toggleCategory}
                                            className="w-4 h-4 accent-black"
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* TYPE */}
                        <div className="bg-white rounded-2xl shadow-sm p-5">
                            <p className="mb-4 text-sm font-semibold text-gray-800">
                                Type
                            </p>

                            <div className="flex flex-col gap-3 text-sm text-gray-700">
                                {["Car Accessories"].map((item) => (
                                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={item}
                                            onChange={toggleSubCategory}
                                            className="w-4 h-4 accent-black"
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT PRODUCTS */}
                <div className="flex-1">

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">

                        <Title text1="ALL" text2="COLLECTIONS" />

                        <select
                            onChange={(e) => setSortType(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                        >
                            <option value="relevant">Sort by: Relevant</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>

                    {/* PRODUCT GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
                                <ProductItem
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 py-10">
                                No products found.
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Collection;