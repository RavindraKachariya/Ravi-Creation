import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

    const navigate = useNavigate()

    const {
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        products
    } = useContext(ShopContext)

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

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            if (!token) {
                toast.error("Please login first")
                return navigate('/login')
            }

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
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                paymentMethod
            }

            const response = await axios.post(
                backendUrl + '/api/order/place',
                orderData,
                { headers: { token } }
            )

            if (response.data.success) {
                setCartItems({})
                localStorage.removeItem("cartItems")
                toast.success("Order Placed Successfully 🎉")
                navigate('/orders')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
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