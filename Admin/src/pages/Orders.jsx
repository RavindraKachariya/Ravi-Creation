import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, Package } from 'lucide-react'

const mockOrders = [
    { id: 'ORD-001', customer: 'Rahul Sharma', email: 'rahul@email.com', items: 3, amount: 320, status: 'Delivered', payment: 'Paid', date: '5 Mar 2026' },
    { id: 'ORD-002', customer: 'Priya Mehta', email: 'priya@email.com', items: 1, amount: 85, status: 'Processing', payment: 'Paid', date: '4 Mar 2026' },
    { id: 'ORD-003', customer: 'Aman Verma', email: 'aman@email.com', items: 2, amount: 145, status: 'Shipped', payment: 'Paid', date: '4 Mar 2026' },
    { id: 'ORD-004', customer: 'Sneha Kapoor', email: 'sneha@email.com', items: 1, amount: 200, status: 'Pending', payment: 'Pending', date: '3 Mar 2026' },
    { id: 'ORD-005', customer: 'Vikram Singh', email: 'vikram@email.com', items: 2, amount: 195, status: 'Delivered', payment: 'Paid', date: '3 Mar 2026' },
    { id: 'ORD-006', customer: 'Anjali Rao', email: 'anjali@email.com', items: 4, amount: 420, status: 'Cancelled', payment: 'Refunded', date: '2 Mar 2026' },
    { id: 'ORD-007', customer: 'Karan Patel', email: 'karan@email.com', items: 1, amount: 60, status: 'Shipped', payment: 'Paid', date: '2 Mar 2026' },
    { id: 'ORD-008', customer: 'Nisha Joshi', email: 'nisha@email.com', items: 3, amount: 275, status: 'Processing', payment: 'Paid', date: '1 Mar 2026' },
]

const statusColor = {
    Delivered: 'bg-green-100 text-green-700',
    Processing: 'bg-blue-100 text-blue-700',
    Shipped: 'bg-yellow-100 text-yellow-700',
    Pending: 'bg-orange-100 text-orange-700',
    Cancelled: 'bg-red-100 text-red-700',
}

const paymentColor = {
    Paid: 'text-green-600',
    Pending: 'text-orange-500',
    Refunded: 'text-red-500',
}

const allStatuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const Orders = () => {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')

    const filtered = mockOrders.filter(o =>
        (statusFilter === 'All' || o.status === statusFilter) &&
        (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
                    <p className="text-xs text-gray-400 mt-0.5">{mockOrders.length} total orders</p>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
                {allStatuses.map(s => (
                    <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition
                        ${statusFilter === s ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-black'}`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 max-w-sm">
                    <Search size={15} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by order ID or customer..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-3.5 font-medium">Order ID</th>
                                <th className="px-4 py-3.5 font-medium">Customer</th>
                                <th className="px-4 py-3.5 font-medium hidden sm:table-cell">Items</th>
                                <th className="px-4 py-3.5 font-medium">Amount</th>
                                <th className="px-4 py-3.5 font-medium hidden md:table-cell">Payment</th>
                                <th className="px-4 py-3.5 font-medium">Status</th>
                                <th className="px-4 py-3.5 font-medium hidden lg:table-cell">Date</th>
                                <th className="px-4 py-3.5 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-12 text-gray-400">
                                        <Package size={40} className="mx-auto mb-2 opacity-30" />
                                        No orders found
                                    </td>
                                </tr>
                            ) : filtered.map((o, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-3.5 font-medium text-gray-800">#{o.id}</td>
                                    <td className="px-4 py-3.5">
                                        <p className="font-medium text-gray-800">{o.customer}</p>
                                        <p className="text-xs text-gray-400">{o.email}</p>
                                    </td>
                                    <td className="px-4 py-3.5 text-gray-600 hidden sm:table-cell">{o.items} item{o.items > 1 ? 's' : ''}</td>
                                    <td className="px-4 py-3.5 font-medium text-gray-800">${o.amount}</td>
                                    <td className={`px-4 py-3.5 font-medium hidden md:table-cell ${paymentColor[o.payment]}`}>{o.payment}</td>
                                    <td className="px-4 py-3.5">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[o.status]}`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5 text-gray-500 hidden lg:table-cell">{o.date}</td>
                                    <td className="px-4 py-3.5 text-right">
                                        <Link
                                            to={`/orders/${o.id}`}
                                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition inline-block"
                                        >
                                            <Eye size={15} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">Showing {filtered.length} of {mockOrders.length} orders</p>
                    <div className="flex gap-1">
                        {[1, 2, 3].map(n => (
                            <button key={n} className={`w-8 h-8 text-sm rounded-lg transition ${n === 1 ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                                {n}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
