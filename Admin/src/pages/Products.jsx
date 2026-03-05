import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, PlusCircle, Edit2, Trash2 } from 'lucide-react'
import p1 from '../../../Frontend/src/assets/p_img1.png'
import p2 from '../../../Frontend/src/assets/p_img2_1.png'
import p3 from '../../../Frontend/src/assets/p_img3.png'
import p4 from '../../../Frontend/src/assets/p_img4.png'
import p5 from '../../../Frontend/src/assets/p_img5.png'
import p6 from '../../../Frontend/src/assets/p_img6.png'
import p7 from '../../../Frontend/src/assets/p_img7.png'
import p8 from '../../../Frontend/src/assets/p_img8.png'

const mockProducts = [
    { id: 1, name: 'Wooden Car Hanger - Black', material: 'Wood', finish: 'Matte Black', price: 1200, stock: 45, status: 'Active', img: p1 },
    { id: 2, name: 'Metal Car Hanger - Chrome', material: 'Metal', finish: 'Chrome', price: 850, stock: 62, status: 'Active', img: p2 },
    { id: 3, name: 'Leather Car Hanger Set', material: 'Leather', finish: 'Brown', price: 1600, stock: 18, status: 'Active', img: p3 },
    { id: 4, name: 'Wooden Car Hanger - Walnut', material: 'Wood', finish: 'Walnut', price: 1400, stock: 8, status: 'Low Stock', img: p4 },
    { id: 5, name: 'Metal Car Hanger - Matte Black', material: 'Metal', finish: 'Matte Black', price: 950, stock: 0, status: 'Out of Stock', img: p5 },
    { id: 6, name: 'Fabric Car Hanger - Beige', material: 'Fabric', finish: 'Beige', price: 600, stock: 90, status: 'Active', img: p6 },
    { id: 7, name: 'Plastic Car Hanger - White', material: 'Plastic', finish: 'White', price: 400, stock: 120, status: 'Active', img: p7 },
    { id: 8, name: 'Leather Car Hanger - Black', material: 'Leather', finish: 'Black', price: 1800, stock: 22, status: 'Active', img: p8 },
]

const statusStyle = {
    'Active': 'bg-green-100 text-green-700',
    'Low Stock': 'bg-yellow-100 text-yellow-700',
    'Out of Stock': 'bg-red-100 text-red-600',
}

const materialOptions = ['All', 'Wood', 'Metal', 'Leather', 'Plastic', 'Fabric']

const Products = () => {
    const [search, setSearch] = useState('')
    const [filterMaterial, setFilterMaterial] = useState('All')

    const filtered = mockProducts.filter(p =>
        (filterMaterial === 'All' || p.material === filterMaterial) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Products</h1>
                    <p className="text-xs text-gray-400 mt-0.5">{mockProducts.length} car hanger products</p>
                </div>
                <Link
                    to="/add-product"
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                >
                    <PlusCircle size={15} />
                    Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 flex-1">
                    <Search size={14} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-300"
                    />
                </div>
                <select
                    value={filterMaterial}
                    onChange={e => setFilterMaterial(e.target.value)}
                    className="border border-gray-100 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-gray-50 cursor-pointer"
                >
                    {materialOptions.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
                                <th className="px-5 py-3 font-normal">#</th>
                                <th className="px-4 py-3 font-normal">Product</th>
                                <th className="px-4 py-3 font-normal hidden md:table-cell">Material</th>
                                <th className="px-4 py-3 font-normal hidden md:table-cell">Finish</th>
                                <th className="px-4 py-3 font-normal">Price</th>
                                <th className="px-4 py-3 font-normal hidden sm:table-cell">Stock</th>
                                <th className="px-4 py-3 font-normal">Status</th>
                                <th className="px-4 py-3 font-normal text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-12 text-gray-300">
                                        <Package size={32} className="mx-auto mb-2" />
                                        <p className="text-sm">No products found</p>
                                    </td>
                                </tr>
                            ) : filtered.map((p, i) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition">
                                    <td className="px-5 py-3.5 text-gray-300 text-xs">{i + 1}</td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <img src={p.img} alt={p.name} className="w-9 h-9 rounded-lg object-cover shrink-0 bg-gray-100" />
                                            <span className="font-medium text-gray-800 text-sm">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 text-gray-500 text-xs hidden md:table-cell">{p.material}</td>
                                    <td className="px-4 py-3.5 text-gray-400 text-xs hidden md:table-cell">{p.finish}</td>
                                    <td className="px-4 py-3.5 font-medium text-gray-800 text-sm">₹{p.price}</td>
                                    <td className="px-4 py-3.5 text-gray-500 text-xs hidden sm:table-cell">{p.stock}</td>
                                    <td className="px-4 py-3.5">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[p.status]}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Link
                                                to={`/edit-product/${p.id}`}
                                                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
                                            >
                                                <Edit2 size={14} />
                                            </Link>
                                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-50">
                    <p className="text-xs text-gray-400">Showing {filtered.length} of {mockProducts.length}</p>
                    <div className="flex gap-1">
                        {[1, 2].map(n => (
                            <button
                                key={n}
                                className={`w-7 h-7 text-xs rounded-lg transition ${n === 1 ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
