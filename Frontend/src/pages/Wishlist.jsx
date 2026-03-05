import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { products } from '../assets/assets';
import { selectWishlistItems, removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import Title from '../components/Title';

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector(selectWishlistItems);
    const currency = "₹";

    // Get full product details from wishlist IDs
    const wishlistProducts = products.filter(product => wishlist.includes(product._id));

    const handleAddToCart = (productId) => {
        dispatch(addToCart({ itemId: productId, size: "Free Size" }));
    };

    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    return (
        <div className='border-t pt-10'>
            <div className='text-2xl mb-10'>
                <Title text1={'My'} text2={'Wishlist'} />
            </div>

            {wishlistProducts.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20'>
                    <FaHeart className='text-6xl text-gray-300 mb-4' />
                    <p className='text-xl text-gray-500 mb-4'>Your wishlist is empty</p>
                    <Link
                        to='/collection'
                        className='bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition'
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {wishlistProducts.map((product) => (
                        <div
                            key={product._id}
                            className='group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300'
                        >
                            {/* Image Section */}
                            <Link to={`/product/${product._id}`} className='block'>
                                <div className='aspect-square flex items-center justify-center bg-gray-50'>
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className='max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105'
                                    />
                                </div>
                            </Link>

                            {/* Content Section */}
                            <div className='px-5 py-4'>
                                <Link to={`/product/${product._id}`}>
                                    <h3 className='text-base font-semibold text-gray-800 mt-1 line-clamp-2 min-h-[48px]'>
                                        {product.name}
                                    </h3>
                                </Link>

                                {/* Price Section */}
                                <div className='flex justify-between items-center mt-3'>
                                    <div>
                                        <span className='text-lg font-bold text-gray-900'>
                                            {currency}{product.price}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className='flex gap-3 mt-4'>
                                    <button
                                        onClick={() => handleAddToCart(product._id)}
                                        className='flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition text-sm'
                                    >
                                        <FaShoppingCart size={14} />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(product._id)}
                                        className='p-2 bg-gray-100 text-red-500 rounded-lg hover:bg-red-50 transition'
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
