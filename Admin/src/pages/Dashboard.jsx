import { ShoppingBag, Users, ShoppingCart, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import p1 from '../../../Frontend/src/assets/p_img1.png'
import p2 from '../../../Frontend/src/assets/p_img2_1.png'
import p3 from '../../../Frontend/src/assets/p_img3.png'
import p4 from '../../../Frontend/src/assets/p_img4.png'
import p5 from '../../../Frontend/src/assets/p_img5.png'

const stats = [
    { label: 'Revenue', value: '₹48,295', icon: <TrendingUp size={16} /> },
    { label: 'Orders', value: '1,284', icon: <ShoppingCart size={16} /> },
    { label: 'Products', value: '24', icon: <ShoppingBag size={16} /> },
    { label: 'Customers', value: '712', icon: <Users size={16} /> },
]

const recentOrders = [
    { id: '#001', customer: 'Rahul Sharma', product: 'Wooden Car Hanger - Black', amount: '₹1,200', status: 'Delivered', img: p1 },
    { id: '#002', customer: 'Priya Mehta', product: 'Metal Car Hanger - Chrome', amount: '₹850', status: 'Processing', img: p2 },
    { id: '#003', customer: 'Aman Verma', product: 'Leather Car Hanger Set', amount: '₹1,600', status: 'Shipped', img: p3 },
    { id: '#004', customer: 'Sneha Kapoor', product: 'Wooden Car Hanger - Walnut', amount: '₹1,400', status: 'Pending', img: p4 },
    { id: '#005', customer: 'Vikram Singh', product: 'Metal Hanger - Matte Black', amount: '₹950', status: 'Delivered', img: p5 },
]

const statusColor = {
    Delivered: 'bg-green-100 text-green-700',
    Processing: 'bg-blue-100 text-blue-700',
    Shipped: 'bg-yellow-100 text-yellow-700',
    Pending: 'bg-gray-100 text-gray-500',
    Cancelled: 'bg-red-100 text-red-500',
}

const Dashboard = () => {
    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-xs text-gray-400 mt-0.5">Car Hanger Store</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-gray-400">{s.label}</p>
                            <span className="text-gray-300">{s.icon}</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border border-gray-100">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
                    <h2 className="text-sm font-medium text-gray-800">Recent Orders</h2>
                    <Link to="/orders" className="text-xs text-gray-400 hover:text-black transition">View all →</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="text-gray-400 border-b border-gray-50">
                                <th className="px-5 py-2.5 text-left font-normal">Order</th>
                                <th className="px-4 py-2.5 text-left font-normal">Customer</th>
                                <th className="px-4 py-2.5 text-left font-normal hidden md:table-cell">Product</th>
                                <th className="px-4 py-2.5 text-left font-normal">Amount</th>
                                <th className="px-4 py-2.5 text-left font-normal">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentOrders.map((o, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition">
                                    <td className="px-5 py-3 text-gray-500">{o.id}</td>
                                    <td className="px-4 py-3 text-gray-700">{o.customer}</td>
                                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <img src={o.img} alt="" className="w-7 h-7 rounded object-cover bg-gray-100 shrink-0" />
                                            <span>{o.product}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-800">{o.amount}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 rounded-full ${statusColor[o.status]}`}>
                                            {o.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
                <Link to="/add-product" className="bg-black text-white rounded-xl p-3.5 text-center text-xs font-medium hover:bg-gray-800 transition">
                    + Add Product
                </Link>
                <Link to="/orders" className="bg-white text-gray-600 rounded-xl p-3.5 text-center text-xs font-medium border border-gray-100 hover:border-gray-300 transition">
                    Manage Orders
                </Link>
                <Link to="/customers" className="bg-white text-gray-600 rounded-xl p-3.5 text-center text-xs font-medium border border-gray-100 hover:border-gray-300 transition">
                    Customers
                </Link>
            </div>
        </div>
    )
}

export default Dashboard
