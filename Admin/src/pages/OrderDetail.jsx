import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Package, MapPin, User, CreditCard } from 'lucide-react'

const statusColor = {
    Delivered: 'bg-green-100 text-green-700',
    Processing: 'bg-blue-100 text-blue-700',
    Shipped: 'bg-yellow-100 text-yellow-700',
    Pending: 'bg-orange-100 text-orange-700',
    Cancelled: 'bg-red-100 text-red-700',
}

const steps = ['Order Placed', 'Processing', 'Shipped', 'Delivered']

const OrderDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const order = {
        id: id || 'ORD-001',
        status: 'Shipped',
        date: '4 March 2026',
        customer: { name: 'Priya Mehta', email: 'priya@email.com', phone: '+91 98765 43210' },
        address: { line1: '12, Lotus Tower, MG Road', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' },
        payment: { method: 'Razorpay', status: 'Paid', transactionId: 'TXN8827364' },
        items: [
            { name: 'Men Casual Shirt', size: 'L', qty: 1, price: 85 },
            { name: 'Women Floral Dress', size: 'M', qty: 1, price: 120 },
        ],
        subtotal: 205,
        shipping: 10,
        total: 215,
    }

    const currentStep = steps.indexOf(order.status === 'Processing' ? 'Processing' : order.status === 'Shipped' ? 'Shipped' : order.status === 'Delivered' ? 'Delivered' : 'Order Placed')

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/orders')} className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex-1 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Placed on {order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[order.status]}`}>
                        {order.status}
                    </span>
                </div>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-800 mb-6">Order Progress</h2>
                <div className="flex items-center">
                    {steps.map((step, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                            ${i <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}>
                                {i <= currentStep ? '✓' : i + 1}
                            </div>
                            <p className={`mt-2 text-xs font-medium text-center ${i <= currentStep ? 'text-gray-800' : 'text-gray-400'}`}>
                                {step}
                            </p>
                            {i < steps.length - 1 && (
                                <div className={`absolute h-0.5 w-full ${i < currentStep ? 'bg-black' : 'bg-gray-200'}`} style={{ display: 'none' }} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="relative mt-4 -mx-6 px-6">
                    <div className="h-1.5 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-black rounded-full transition-all duration-500"
                            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Update Status */}
                <div className="mt-6 flex items-center gap-3">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black bg-white cursor-pointer">
                        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                            <option key={s} selected={s === order.status}>{s}</option>
                        ))}
                    </select>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition">
                        Update Status
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Customer Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <User size={16} className="text-gray-400" />
                        <h2 className="font-semibold text-gray-800">Customer</h2>
                    </div>
                    <div className="space-y-1 text-sm">
                        <p className="font-medium text-gray-800">{order.customer.name}</p>
                        <p className="text-gray-500">{order.customer.email}</p>
                        <p className="text-gray-500">{order.customer.phone}</p>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin size={16} className="text-gray-400" />
                        <h2 className="font-semibold text-gray-800">Shipping Address</h2>
                    </div>
                    <div className="text-sm text-gray-500 space-y-0.5">
                        <p className="font-medium text-gray-800">{order.address.line1}</p>
                        <p>{order.address.city}, {order.address.state}</p>
                        <p>{order.address.pincode}, {order.address.country}</p>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <CreditCard size={16} className="text-gray-400" />
                        <h2 className="font-semibold text-gray-800">Payment</h2>
                    </div>
                    <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Method</span>
                            <span className="font-medium text-gray-800">{order.payment.method}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status</span>
                            <span className="font-medium text-green-600">{order.payment.status}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Transaction</span>
                            <span className="font-medium text-gray-600 text-xs">{order.payment.transactionId}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <Package size={16} className="text-gray-400" />
                        <h2 className="font-semibold text-gray-800">Order Items</h2>
                    </div>
                </div>
                <div className="divide-y divide-gray-50">
                    {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 px-6 py-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                <Package size={18} className="text-gray-400" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                                <p className="text-xs text-gray-400 mt-0.5">Size: {item.size} • Qty: {item.qty}</p>
                            </div>
                            <p className="font-semibold text-gray-800">${item.price}</p>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="border-t border-gray-100 px-6 py-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span>${order.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Shipping</span>
                        <span>${order.shipping}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                        <span>Total</span>
                        <span>${order.total}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
