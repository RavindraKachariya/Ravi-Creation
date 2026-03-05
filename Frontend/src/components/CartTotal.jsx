import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { products } from '../assets/assets'
import Title from './Title';

const CartTotal = () => {
    const cartItems = useSelector((state) => state.cart.cartItems)
    const currency = "₹"
    const delivery_fee = 10

    const cartAmount = useMemo(() => {
        let totalAmount = 0
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                if (cartItems[items][size] > 0) {
                    const itemInfo = products.find(
                        (product) => product._id === items
                    )
                    if (itemInfo) {
                        totalAmount += itemInfo.price * cartItems[items][size]
                    }
                }
            }
        }
        return totalAmount
    }, [cartItems])

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {cartAmount}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Total</p>
                    <p>{currency} {cartAmount === 0 ? 0 : cartAmount + delivery_fee}</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
