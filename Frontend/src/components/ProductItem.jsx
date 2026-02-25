import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    const productImage =
        Array.isArray(image) && image.length > 0
            ? image[0]
            : '';

    return (
        <Link
            to={`/product/${id}`}
            className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-200"
        >
            {/* Image Wrapper */}
            <div className="w-full h-72 bg-gray-50 overflow-hidden">
                <img
                    src={productImage}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
            </div>

            {/* Content Section */}
            <div className="px-4 py-4 bg-white">
                <p className="text-sm text-gray-800 font-medium leading-snug min-h-[40px]">
                    {name}
                </p>

                <p className="mt-2 text-base font-semibold text-gray-900">
                    {currency}{price}
                </p>
            </div>
        </Link>
    );
};

export default ProductItem;