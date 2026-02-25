import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

    // Prevent crash if products not ready
    if (!products || products.length === 0) {
        return <div className='pt-20 text-center'>Loading Cart...</div>
    }

    const cartData = useMemo(() => {
        const tempData = []
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    })
                }
            }
        }
        return tempData
    }, [cartItems])

    return (
        <div className='border-t pt-14 px-4 sm:px-10'>

            {/* Heading */}
            <div className='text-2xl mb-8'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {/* Empty Cart */}
            {cartData.length === 0 && (
                <div className='text-center py-16 text-gray-500 text-lg'>
                    Your cart is empty.
                </div>
            )}

            {/* Cart Items */}
            <div className='space-y-6'>
                {cartData.map((item, index) => {

                    const productData = products.find(
                        (product) => product._id === item._id
                    )

                    if (!productData || !productData.image) return null

                    return (
                        <div
                            key={index}
                            className='bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-6'
                        >

                            {/* Left Side */}
                            <div className='flex items-center gap-5'>

                                <img
                                    src={productData.image[0]}
                                    className='w-20 h-20 object-cover rounded-xl'
                                    alt=""
                                />

                                <div>
                                    <p className='text-base sm:text-lg font-semibold text-gray-800'>
                                        {productData.name}
                                    </p>

                                    <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                                        <p className='font-medium text-gray-900'>
                                            {currency}{productData.price}
                                        </p>

                                        <span className='px-3 py-1 rounded-full bg-gray-100 border text-xs'>
                                            {item.size}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className='flex items-center gap-6'>

                                <input
                                    onChange={(e) =>
                                        e.target.value === '' || e.target.value === '0'
                                            ? null
                                            : updateQuantity(
                                                item._id,
                                                item.size,
                                                Number(e.target.value)
                                            )
                                    }
                                    className='w-16 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-black transition'
                                    type="number"
                                    min='1'
                                    defaultValue={item.quantity}
                                />

                                <img
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                    src={assets.bin_icon}
                                    className='w-5 cursor-pointer hover:scale-110 transition'
                                    alt=""
                                />

                            </div>

                        </div>
                    )
                })}
            </div>

            {/* Cart Total Section */}
            {cartData.length > 0 && (
                <div className='flex justify-end my-16'>
                    <div className='w-full sm:w-[420px] bg-white p-6 rounded-2xl shadow-sm'>

                        <CartTotal />

                        <button
                            onClick={() => navigate('/place-order')}
                            className='w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium'
                        >
                            PROCEED TO CHECKOUT
                        </button>

                    </div>
                </div>
            )}

        </div>
    )
}

export default Cart