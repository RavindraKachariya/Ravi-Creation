import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useSelector, useDispatch } from 'react-redux'
import { products } from '../assets/assets'
import { clearCart } from '../store/cartSlice'
import { addOrder } from '../store/ordersSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cartItems)
    const delivery_fee = 10

    const [paymentMethod, setPaymentMethod] = useState("COD")

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData(data => ({ ...data, [name]: value }))
    }

    // Calculate cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                if (cartItems[items][size] > 0) {
                    const itemInfo = products.find((product) => product._id === items);
                    if (itemInfo) {
                        totalAmount += itemInfo.price * cartItems[items][size];
                    }
                }
            }
        }
        return totalAmount;
    };

    const onSubmitHandler = (e) => {
        e.preventDefault()

        try {
            let orderItems = []

            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        const product = products.find(p => p._id === itemId)
                        if (product) {
                            orderItems.push({
                                ...product,
                                size,
                                quantity: cartItems[itemId][size]
                            })
                        }
                    }
                }
            }

            if (orderItems.length === 0) {
                toast.error("Cart is empty")
                return
            }

            const orderData = {
                id: Date.now(),
                address: formData,
                items: cartItems,
                total: getCartAmount() + delivery_fee,
                paymentMethod,
                date: new Date().toLocaleString(),
                status: "Order Confirmed"
            }

            dispatch(addOrder(orderData))
            dispatch(clearCart())
            toast.success("Order Placed Successfully 🎉")
            navigate('/orders')

        } catch {
            toast.error("Order Failed")
        }
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className='max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10'
        >

            {/* LEFT FORM */}
            <div className='flex-1 bg-white shadow-md rounded-xl p-6 space-y-5'>

                <Title text1="DELIVERY" text2="INFORMATION" />

                <div className='grid grid-cols-2 gap-4 mt-5'>
                    <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} className='input border p-2 border-gray-600' placeholder='First Name' />
                    <input required name='lastName' onChange={onChangeHandler} value={formData.lastName} className='input border p-2 border-gray-600' placeholder='Last Name' />
                </div>

                <input required name='email' onChange={onChangeHandler} value={formData.email} className='input w-full border p-2 border-gray-600' placeholder='Email Address' />
                <input required name='street' onChange={onChangeHandler} value={formData.street} className='input w-full border p-2 border-gray-600' placeholder='Street Address' />

                <div className='grid grid-cols-2 gap-4'>
                    <input required name='city' onChange={onChangeHandler} value={formData.city} className='input border p-2 border-gray-600' placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={formData.state} className='input border p-2 border-gray-600' placeholder='State' />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <input required name='zipcode' onChange={onChangeHandler} value={formData.zipcode} className='input border p-2 border-gray-600' placeholder='Zip Code' />
                    <input required name='country' onChange={onChangeHandler} value={formData.country} className='input border p-2 border-gray-600' placeholder='Country' />
                </div>

                <input required name='phone' onChange={onChangeHandler} value={formData.phone} className='input w-full border p-2 border-gray-600' placeholder='Phone Number' />

                {/* PAYMENT OPTIONS */}
                <div className='mt-6'>
                    <h3 className='font-semibold mb-3 text-lg'>Payment Method</h3>

                    <div className='space-y-2'>
                        <label className='flex items-center gap-3 border p-3 rounded cursor-pointer hover:bg-gray-50'>
                            <input type='radio' value='COD' checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
                            Cash On Delivery
                        </label>

                        <label className='flex items-center gap-3 border p-3 rounded cursor-pointer hover:bg-gray-50'>
                            <input type='radio' value='UPI' checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} />
                            UPI Payment
                        </label>

                        <label className='flex items-center gap-3 border p-3 rounded cursor-pointer hover:bg-gray-50'>
                            <input type='radio' value='ONLINE' checked={paymentMethod === "ONLINE"} onChange={() => setPaymentMethod("ONLINE")} />
                            Credit / Debit Card
                        </label>
                    </div>
                </div>

            </div>

            {/* RIGHT SUMMARY */}
            <div className='w-full lg:w-[420px] space-y-6'>

                <div className='bg-white shadow-md rounded-xl p-6'>
                    <CartTotal />
                </div>

                <button
                    type='submit'
                    className='w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold'
                >
                    PLACE ORDER
                </button>

            </div>

        </form>
    )
}

export default PlaceOrder
