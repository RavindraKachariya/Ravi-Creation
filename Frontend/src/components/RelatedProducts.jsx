import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {

        if (products.length > 0 && category && subCategory) {

            // Filter products by category and subCategory
            const filteredProducts = products.filter(
                (item) =>
                    item.category === category &&
                    item.subCategory === subCategory
            );

            // Remove current product duplication (optional but good practice)
            setRelated(filteredProducts.slice(0, 5));
        }

    }, [products, category, subCategory]);

    // If no related products, don't show section
    if (related.length === 0) {
        return null;
    }

    return (
        <div className="my-24">

            {/* Title */}
            <div className="text-center text-3xl py-2">
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">

                {related.map((item) => (
                    <ProductItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}   // ✅ correct field
                    />
                ))}

            </div>
        </div>
    );
};

export default RelatedProducts;