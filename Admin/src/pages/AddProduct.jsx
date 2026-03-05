import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, X, ChevronLeft } from 'lucide-react'

const AddProduct = () => {
    const navigate = useNavigate()
    const [images, setImages] = useState([null, null, null, null])
    const [form, setForm] = useState({
        name: '',
        description: '',
        material: 'Wood',
        finish: '',
        price: '',
        stock: '',
        bestseller: false,
        newArrival: false,
    })

    const materialOptions = ['Wood', 'Metal', 'Leather', 'Plastic', 'Fabric']

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleImageChange = (e, idx) => {
        const file = e.target.files[0]
        if (file) {
            const newImages = [...images]
            newImages[idx] = URL.createObjectURL(file)
            setImages(newImages)
        }
    }

    const removeImage = (idx) => {
        const newImages = [...images]
        newImages[idx] = null
        setImages(newImages)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/products')
    }

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate('/products')}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400"
                >
                    <ChevronLeft size={18} />
                </button>
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Add Product</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Add a new car hanger product</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h2 className="text-sm font-medium text-gray-700 mb-3">Product Images</h2>
                    <div className="grid grid-cols-4 gap-3">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative">
                                <label
                                    htmlFor={`img-${idx}`}
                                    className={`block w-full aspect-square rounded-lg border-2 border-dashed cursor-pointer transition overflow-hidden
                                    ${img ? 'border-gray-200' : 'border-gray-200 hover:border-black'}`}
                                >
                                    {img ? (
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-300">
                                            <Upload size={18} />
                                            <span className="text-xs mt-1">{idx === 0 ? 'Main' : `Alt ${idx}`}</span>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id={`img-${idx}`}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, idx)}
                                />
                                {img && (
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-gray-500 hover:text-red-500"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Basic Info */}
                <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                    <h2 className="text-sm font-medium text-gray-700">Product Details</h2>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Product Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Wooden Car Hanger - Black"
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-black transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe the product..."
                            rows={3}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-black transition resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1.5">Material *</label>
                            <select
                                name="material"
                                value={form.material}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-black transition bg-white"
                            >
                                {materialOptions.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1.5">Finish / Color</label>
                            <input
                                type="text"
                                name="finish"
                                value={form.finish}
                                onChange={handleChange}
                                placeholder="e.g. Matte Black, Chrome"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-black transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1.5">Price (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="0"
                                required
                                min="0"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-black transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1.5">Stock Quantity</label>
                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-black transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h2 className="text-sm font-medium text-gray-700 mb-3">Tags</h2>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="bestseller"
                                checked={form.bestseller}
                                onChange={handleChange}
                                className="rounded border-gray-300 accent-black"
                            />
                            <span className="text-sm text-gray-600">Bestseller</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="newArrival"
                                checked={form.newArrival}
                                onChange={handleChange}
                                className="rounded border-gray-300 accent-black"
                            />
                            <span className="text-sm text-gray-600">New Arrival</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 transition"
                    >
                        Add Product
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="text-sm text-gray-500 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
