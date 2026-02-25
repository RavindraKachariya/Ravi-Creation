import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

    const { backendUrl, token, currency } = useContext(ShopContext)
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            if (!token) return

            const response = await axios.post(
                backendUrl + '/api/order/userOrders',
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                setOrders(response.data.orders.reverse())
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [token])

    return (
        <div className='max-w-6xl mx-auto px-4 py-10'>

            <Title text1="MY" text2="ORDERS" />

            {orders.length === 0 && (
                <p className='mt-6 text-gray-500'>No Orders Found</p>
            )}

            {orders.map((order, index) => (
                <div key={index} className='bg-white shadow-md rounded-xl p-6 mt-6'>

                    <div className='flex justify-between mb-4'>
                        <p className='font-semibold'>
                            Order Date: {new Date(order.date).toLocaleString()}
                        </p>
                        <span className='text-green-600 font-medium'>
                            {order.status}
                        </span>
                    </div>

                    {order.items.map((item, i) => (
                        <div key={i} className='flex gap-5 border-t pt-4 mt-4'>

                            <img src={item.images?.[0]} className='w-20 rounded' />

                            <div>
                                <p className='font-semibold'>{item.name}</p>
                                <p>{currency}{item.price}</p>
                                <p>Qty: {item.quantity}</p>
                                <p>Size: {item.size}</p>
                            </div>

                        </div>
                    ))}

                    <div className='mt-4 border-t pt-4 text-right font-semibold'>
                        Total: {currency}{order.amount}
                    </div>

                </div>
            ))}

        </div>
    )
}

export default Orders