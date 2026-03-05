import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react'
import logo from '../assets/logo.png'

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    // eslint-disable-next-line no-unused-vars
    const _email = location.state?.email || ''
    const [form, setForm] = useState({ password: '', confirm: '' })
    const [show, setShow] = useState({ password: false, confirm: false })
    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (form.password !== form.confirm) return
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setDone(true)
            setTimeout(() => navigate('/login'), 2000)
        }, 1000)
    }

    if (done) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
                    <div className="flex justify-center mb-5">
                        <img src={logo} alt="Logo" className="h-30 object-contain" />
                    </div>
                    <div className="flex justify-center mb-4">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">Password Reset!</h2>
                    <p className="text-xs text-gray-400">Redirecting to login...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-30 object-contain" />
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Set New Password</h2>
                    <p className="text-xs text-gray-400 mt-1">Create a strong new password for your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5">New Password</label>
                        <div className="relative">
                            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type={show.password ? 'text' : 'password'}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="Min 8 characters"
                                required
                                minLength={8}
                                className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition text-gray-800 placeholder-gray-300"
                            />
                            <button type="button" onClick={() => setShow(s => ({ ...s, password: !s.password }))}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600">
                                {show.password ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Confirm Password</label>
                        <div className="relative">
                            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type={show.confirm ? 'text' : 'password'}
                                value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                placeholder="Re-enter password"
                                required
                                className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition text-gray-800 placeholder-gray-300"
                            />
                            <button type="button" onClick={() => setShow(s => ({ ...s, confirm: !s.confirm }))}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600">
                                {show.confirm ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                        {form.confirm && form.password !== form.confirm && (
                            <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || form.password !== form.confirm || !form.password}
                        className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 mt-2"
                    >
                        {loading ? 'Saving...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
