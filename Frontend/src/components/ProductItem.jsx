import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaStar } from 'react-icons/fa';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import { selectWishlistItems } from '../store/wishlistSlice';

const ProductItem = ({ id, image, name, price }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(selectWishlistItems);
    const currency = "₹";

    const productImage =
        Array.isArray(image) && image.length > 0
            ? image[0]
            : '';

    const isInWishlist = wishlist.includes(id);

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInWishlist) {
            dispatch(removeFromWishlist(id));
        } else {
            dispatch(addToWishlist(id));
        }
    };

    return (
        <Link
            to={`/product/${id}`}
            className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
            {/* Image Section */}
            <div className="relative">

                {/* Fixed Ratio Image Box */}
                <div className="aspect-square flex items-center justify-center">
                    <img
                        src={productImage}
                        alt={name}
                        className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Right Side Hover Icons */}
                <div className="absolute top-6 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                    <button
                        onClick={handleWishlistClick}
                        className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-100 ${isInWishlist ? 'text-red-500' : 'text-gray-400'
                            }`}
                    >
                        <FaHeart size={14} className={isInWishlist ? 'fill-current' : ''} />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                        <FaEye size={14} />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-5 py-4">

                {/* Name */}
                <h3 className="text-base font-semibold text-gray-800 mt-1 line-clamp-2 min-h-[48px]">
                    {name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 text-orange-400">
                    <FaStar size={14} />
                    <FaStar size={14} />
                    <FaStar size={14} />
                    <FaStar size={14} />
                    <FaStar size={14} className="text-gray-300" />
                </div>

                {/* Price Section */}
                <div className="flex justify-between items-center mt-3">
                    <div>
                        <span className="text-lg font-bold text-gray-900">
                            {currency}{price}
                        </span>
                        <span className="ml-2 text-sm text-gray-400 line-through">
                            {currency}{Number(price) + 7}
                        </span>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
