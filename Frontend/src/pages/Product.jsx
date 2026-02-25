import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);

    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    useEffect(() => {

        if (products.length > 0) {

            const product = products.find(
                (item) => item._id === productId
            );

            if (product) {
                setProductData(product);
                setImage(product.image[0]); // ✅ correct field
            }

        }

    }, [productId, products]);

    if (!productData) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return (
        <div className="border-t pt-12 px-4 sm:px-10">

            <div className="flex flex-col lg:flex-row gap-14">

                {/* LEFT - IMAGES */}
                <div className="flex-1 flex flex-col lg:flex-row gap-5">

                    {/* Thumbnails */}
                    <div className="flex lg:flex-col gap-3 overflow-x-auto">
                        {productData.image.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                onClick={() => setImage(item)}
                                className={`w-20 h-20 rounded-lg object-cover cursor-pointer border transition 
                            ${image === item ? 'border-black scale-105' : 'border-gray-200 hover:border-gray-400'}`}
                                alt="thumbnail"
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1">
                        <div className="bg-gray-50 rounded-2xl p-4">
                            <img
                                src={image}
                                className="w-full h-auto rounded-xl object-cover"
                                alt="product"
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT - DETAILS */}
                <div className="flex-1">

                    <h1 className="text-3xl font-semibold text-gray-800">
                        {productData.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-3">
                        <img src={assets.star_icon} className="w-4" alt="" />
                        <img src={assets.star_icon} className="w-4" alt="" />
                        <img src={assets.star_icon} className="w-4" alt="" />
                        <img src={assets.star_icon} className="w-4" alt="" />
                        <img src={assets.star_dull_icon} className="w-4" alt="" />
                        <p className="pl-2 text-sm text-gray-500">(122 Reviews)</p>
                    </div>

                    {/* Price */}
                    <p className="mt-6 text-3xl font-bold text-gray-900">
                        {currency} {productData.price}
                    </p>

                    {/* Description */}
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        {productData.description}
                    </p>

                    {/* Size Selection */}
                    <div className="mt-8">
                        <p className="font-medium text-gray-800 mb-3">
                            Select Size
                        </p>

                        <div className="flex gap-3 flex-wrap">
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`px-5 py-2 rounded-lg border transition 
                                ${item === size
                                            ? 'bg-black text-white border-black'
                                            : 'bg-gray-100 border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add To Cart */}
                    <button
                        onClick={() => addToCart(productData._id, size)}
                        className="mt-8 w-full sm:w-auto bg-black text-white px-10 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                        ADD TO CART
                    </button>

                    {/* Extra Info */}
                    <div className="mt-10 bg-gray-50 rounded-xl p-5 text-sm text-gray-600 space-y-2">
                        <p>✔ 100% Original handmade product.</p>
                        <p>✔ Cash on delivery available.</p>
                        <p>✔ Easy return & exchange within 7 days.</p>
                    </div>

                </div>
            </div>

            {/* Related Products */}
            <div className="mt-20">
                <RelatedProducts
                    category={productData.category}
                    subCategory={productData.subCategory}
                />
            </div>

        </div>
    );
};

export default Product;