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
        <div className="border-t-2 pt-10 transition-opacity duration-500">

            {/* Product Section */}
            <div className="flex flex-col sm:flex-row gap-12">

                {/* LEFT SIDE - IMAGES */}
                <div className="flex-1 flex flex-col sm:flex-row gap-3">

                    {/* Thumbnails */}
                    <div className="flex sm:flex-col gap-2 overflow-x-auto">
                        {productData.image.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                onClick={() => setImage(item)}
                                className={`w-24 h-24 object-cover cursor-pointer border ${image === item ? 'border-orange-500' : 'border-gray-200'
                                    }`}
                                alt="thumbnail"
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1">
                        <img
                            src={image}
                            className="w-full h-auto border border-gray-200"
                            alt="product"
                        />
                    </div>
                </div>

                {/* RIGHT SIDE - DETAILS */}
                <div className="flex-1">

                    <h1 className="font-medium text-2xl">
                        {productData.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                        <img src={assets.star_icon} className="w-3.5" alt="" />
                        <img src={assets.star_icon} className="w-3.5" alt="" />
                        <img src={assets.star_icon} className="w-3.5" alt="" />
                        <img src={assets.star_icon} className="w-3.5" alt="" />
                        <img src={assets.star_dull_icon} className="w-3.5" alt="" />
                        <p className="pl-2">(122)</p>
                    </div>

                    {/* Price */}
                    <p className="mt-5 text-3xl font-medium">
                        {currency} {productData.price}
                    </p>

                    {/* Description */}
                    <p className="mt-5 text-gray-500">
                        {productData.description}
                    </p>

                    {/* Size Selection */}
                    <div className="flex flex-col gap-4 my-8">
                        <p className="font-medium">Select Size</p>

                        <div className="flex gap-2">
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`bg-gray-100 py-2 px-4 border ${item === size
                                            ? 'border-orange-500'
                                            : 'border-gray-200'
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
                        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                    >
                        ADD TO CART
                    </button>

                    <hr className="mt-8 sm:w-4/5" />

                    {/* Extra Info */}
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original product.</p>
                        <p>Cash on delivery available.</p>
                        <p>Easy return & exchange within 7 days.</p>
                    </div>

                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />

        </div>
    );
};

export default Product;