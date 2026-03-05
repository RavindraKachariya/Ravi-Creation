import { useState } from 'react'
import { Camera, Mail, Phone, User } from 'lucide-react'

const Profile = () => {
    const [form, setForm] = useState({
        name: 'Admin',
        email: 'admin@ravicreation.com',
        phone: '+91 91062 38665',
        role: 'Super Admin',
    })
    const [saved, setSaved] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="space-y-5 max-w-xl">
            <div>
                <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
                <p className="text-xs text-gray-400 mt-0.5">Manage your admin account details</p>
            </div>

            {/* Avatar */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center gap-5">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold shrink-0">
                        A
                    </div>
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition">
                        <Camera size={12} className="text-gray-500" />
                    </button>
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{form.name}</p>
                    <p className="text-xs text-gray-400">{form.role}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{form.email}</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                <h2 className="text-sm font-medium text-gray-700">Personal Information</h2>

                <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Full Name</label>
                    <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black transition" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Email Address</label>
                    <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black transition" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Phone Number</label>
                    <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input type="text" name="phone" value={form.phone} onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black transition" />
                    </div>
                </div>

                <div className="pt-1">
                    <button type="submit"
                        className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 transition">
                        {saved ? '✓ Saved!' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Profile
