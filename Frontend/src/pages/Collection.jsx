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
        <>
            <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">

                {/* LEFT SIDE FILTER */}
                <div className="min-w-60">

                    <p
                        onClick={() => setShowFilter(!showFilter)}
                        className="my-2 text-xl flex items-center gap-2 cursor-pointer"
                    >
                        FILTERS
                        <img
                            className={`h-3 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""
                                }`}
                            src={assets.dropdown_icon}
                            alt=""
                        />
                    </p>

                    {/* CATEGORY */}
                    <div
                        className={`border border-gray-300 px-5 py-4 mt-6 rounded ${showFilter ? "" : "hidden"
                            } sm:block`}
                    >
                        <p className="mb-3 text-sm font-semibold">CATEGORIES</p>

                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                            {["Men", "Women", "Kids"].map((item) => (
                                <label key={item} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={item}
                                        onChange={toggleCategory}
                                        className="w-4 h-4"
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* TYPE */}
                    <div
                        className={`border border-gray-300 px-5 py-4 mt-6 rounded ${showFilter ? "" : "hidden"
                            } sm:block`}
                    >
                        <p className="mb-3 text-sm font-semibold">TYPE</p>

                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                            {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                                <label key={item} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={item}
                                        onChange={toggleSubCategory}
                                        className="w-4 h-4"
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE PRODUCTS */}
                <div className="flex-1">

                    <div className="flex justify-between items-center mb-4">
                        <Title text1="ALL" text2="COLLECTIONS" />

                        <select
                            onChange={(e) => setSortType(e.target.value)}
                            className="border border-gray-300 text-sm px-3 py-1 rounded"
                        >
                            <option value="relevant">Sort by: Relevant</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>

                    {/* PRODUCT GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
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
                            <p className="col-span-full text-gray-500 text-center">
                                No products found.
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Collection;