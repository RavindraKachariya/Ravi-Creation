import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import logo from '../assets/logo.png'

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState({ email: '', password: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img src={logo} alt="Logo" className="h-30 object-contain" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
                <p className="text-sm text-gray-500 mb-8">Sign in to your admin account</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="admin@forever.com"
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="checkbox" className="accent-black" />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="text-sm text-black font-medium hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-400">
                    Ravi Creation Ecommerce Admin Panel &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    )
}

export default Login
