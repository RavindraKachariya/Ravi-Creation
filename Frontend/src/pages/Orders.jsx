import React from 'react'
import { useSelector } from 'react-redux'
import { products } from '../assets/assets'
import { selectOrders } from '../store/ordersSlice'
import Title from '../components/Title'

const Orders = () => {
    const orders = useSelector(selectOrders)

    return (
        <div className='border-t pt-10'>
            <div className='text-2xl mb-10'>
                <Title text1={'My'} text2={'Orders'} />
            </div>

            {orders.length === 0 ? (
                <div className='text-center py-16 text-gray-500 text-lg'>
                    You haven't placed any orders yet.
                </div>
            ) : (
                <div className='space-y-6'>
                    {orders.map((order, index) => (
                        <div key={index} className='bg-white rounded-2xl shadow-sm p-6'>
                            <div className='flex justify-between items-center mb-4'>
                                <div>
                                    <p className='font-semibold text-gray-800'>Order #{order.id}</p>
                                    <p className='text-sm text-gray-500'>{order.date}</p>
                                </div>
                                <div className='text-right'>
                                    <p className='font-semibold text-gray-800'>₹{order.total}</p>
                                    <p className='text-sm text-green-600'>{order.status}</p>
                                </div>
                            </div>

                            <div className='space-y-3'>
                                {Object.entries(order.items).map(([itemId, sizes]) =>
                                    Object.entries(sizes).map(([size, quantity]) => {
                                        const product = products.find(p => p._id === itemId)
                                        if (!product) return null

                                        return (
                                            <div key={`${itemId}-${size}`} className='flex items-center gap-4'>
                                                <img
                                                    src={product.image[0]}
                                                    alt={product.name}
                                                    className='w-16 h-16 object-cover rounded-lg'
                                                />
                                                <div>
                                                    <p className='font-medium text-gray-800'>{product.name}</p>
                                                    <p className='text-sm text-gray-500'>Size: {size} | Qty: {quantity}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders
