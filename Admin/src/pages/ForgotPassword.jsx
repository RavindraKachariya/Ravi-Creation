import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import logo from '../assets/logo.png'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate('/verify-otp', { state: { email } })
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-30 object-contain" />
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Forgot Password</h2>
                    <p className="text-xs text-gray-400 mt-1">Enter your email and we'll send a verification code</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Email Address</label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@email.com"
                                required
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition text-gray-800 placeholder-gray-300"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-60"
                    >
                        {loading ? 'Sending...' : 'Send Code'}
                    </button>
                </form>

                <div className="mt-5 text-center">
                    <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-black transition">
                        <ArrowLeft size={13} />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
