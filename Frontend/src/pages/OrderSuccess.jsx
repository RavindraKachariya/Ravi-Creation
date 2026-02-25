import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderSuccess = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/orders')
        }, 2500)

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div className='flex flex-col items-center justify-center min-h-[80vh] border-t'>

            <div className='text-green-600 text-6xl mb-4 animate-bounce'>
                ✓
            </div>

            <h1 className='text-2xl font-semibold mb-2'>
                Order Placed Successfully!
            </h1>

            <p className='text-gray-500'>
                Redirecting to your orders...
            </p>

        </div>
    )
}

export default OrderSuccess