import { useState, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import logo from '../assets/logo.png'

const VerifyOtp = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email || 'your email'
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [resent, setResent] = useState(false)
    const inputs = useRef([])

    const handleChange = (val, idx) => {
        if (!/^\d*$/.test(val)) return
        const newOtp = [...otp]
        newOtp[idx] = val.slice(-1)
        setOtp(newOtp)
        if (val && idx < 5) inputs.current[idx + 1]?.focus()
    }

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
            inputs.current[idx - 1]?.focus()
        }
    }

    const handleResend = () => {
        setResent(true)
        setTimeout(() => setResent(false), 3000)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate('/reset-password', { state: { email } })
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-30 object-contain" />
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Verify Email</h2>
                    <p className="text-xs text-gray-400 mt-1">
                        Enter the 6-digit code sent to <span className="text-gray-600 font-medium">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* OTP Inputs */}
                    <div className="flex gap-2 justify-between">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={el => inputs.current[idx] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, idx)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                className="w-11 h-11 text-center text-base font-semibold border border-gray-200 rounded-lg outline-none focus:border-black transition text-gray-900"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.join('').length < 6}
                        className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={handleResend}
                        className="text-xs text-gray-400 hover:text-black transition"
                    >
                        {resent ? '✓ Code resent!' : "Didn't receive? Resend code"}
                    </button>
                </div>

                <div className="mt-3 text-center">
                    <Link to="/forgot-password" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-black transition">
                        <ArrowLeft size={13} />
                        Change email
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp
