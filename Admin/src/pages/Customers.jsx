import { useState } from 'react'
import { Search, Users } from 'lucide-react'

const mockCustomers = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210', orders: 12, spent: 14500, joined: 'Jan 2025', status: 'Active' },
    { id: 2, name: 'Priya Mehta', email: 'priya@email.com', phone: '+91 87654 32109', orders: 8, spent: 9800, joined: 'Feb 2025', status: 'Active' },
    { id: 3, name: 'Aman Verma', email: 'aman@email.com', phone: '+91 76543 21098', orders: 5, spent: 6200, joined: 'Mar 2025', status: 'Active' },
    { id: 4, name: 'Sneha Kapoor', email: 'sneha@email.com', phone: '+91 65432 10987', orders: 15, spent: 21000, joined: 'Dec 2024', status: 'Active' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 54321 09876', orders: 3, spent: 2900, joined: 'Apr 2025', status: 'Inactive' },
    { id: 6, name: 'Anjali Rao', email: 'anjali@email.com', phone: '+91 43210 98765', orders: 20, spent: 32000, joined: 'Nov 2024', status: 'Active' },
    { id: 7, name: 'Karan Patel', email: 'karan@email.com', phone: '+91 32109 87654', orders: 7, spent: 7500, joined: 'May 2025', status: 'Active' },
    { id: 8, name: 'Nisha Joshi', email: 'nisha@email.com', phone: '+91 21098 76543', orders: 0, spent: 0, joined: 'Feb 2026', status: 'Inactive' },
]

const Customers = () => {
    const [search, setSearch] = useState('')

    const filtered = mockCustomers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-semibold text-gray-900">Customers</h1>
                <p className="text-xs text-gray-400 mt-0.5">{mockCustomers.length} registered customers</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                    <Search size={14} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-300"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="text-gray-400 bg-gray-50 border-b border-gray-100">
                                <th className="px-5 py-3 text-left font-normal">Customer</th>
                                <th className="px-4 py-3 text-left font-normal hidden md:table-cell">Phone</th>
                                <th className="px-4 py-3 text-left font-normal">Orders</th>
                                <th className="px-4 py-3 text-left font-normal hidden sm:table-cell">Total Spent</th>
                                <th className="px-4 py-3 text-left font-normal hidden md:table-cell">Joined</th>
                                <th className="px-4 py-3 text-left font-normal">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-300">
                                        <Users size={24} className="mx-auto mb-2" />
                                        <p>No customers found</p>
                                    </td>
                                </tr>
                            ) : filtered.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50 transition">
                                    <td className="px-5 py-3">
                                        <p className="font-medium text-gray-800 text-sm">{c.name}</p>
                                        <p className="text-gray-400 text-xs">{c.email}</p>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{c.phone}</td>
                                    <td className="px-4 py-3 text-gray-700">{c.orders}</td>
                                    <td className="px-4 py-3 font-medium text-gray-800 hidden sm:table-cell">₹{c.spent.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{c.joined}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 rounded-full ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-3 border-t border-gray-50">
                    <p className="text-xs text-gray-400">Showing {filtered.length} of {mockCustomers.length} customers</p>
                </div>
            </div>
        </div>
    )
}

export default Customers
