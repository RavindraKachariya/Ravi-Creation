import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const [step, setStep] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    // MAIN SUBMIT HANDLER
    const onSubmitHandler = (e) => {
        e.preventDefault()

        // SIGN UP
        if (step === 'Sign Up') {
            const userData = { name, email }
            localStorage.setItem('user', JSON.stringify(userData))
            toast.success("Account Created Successfully")
            navigate('/')
        }

        // LOGIN
        else if (step === 'Login') {
            const userData = { name: email.split('@')[0], email }
            localStorage.setItem('user', JSON.stringify(userData))
            toast.success("Login Successful")
            navigate('/')
        }

        // SEND OTP
        else if (step === 'Forgot Password') {
            toast.success("OTP Sent to your Email (Demo Code: 1234)")
            setStep('Verify OTP')
        }

        // VERIFY OTP
        else if (step === 'Verify OTP') {
            if (otp === '1234') {
                toast.success("OTP Verified")
                setStep('Reset Password')
            } else {
                toast.error("Invalid OTP")
            }
        }

        // RESET PASSWORD
        else if (step === 'Reset Password') {
            if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match")
                return
            }

            toast.success("Password Changed Successfully")
            setStep('Login')
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user && step === 'Login') {
            navigate('/')
        }
    }, [step])

    return (
        <div className="flex items-center justify-center px-4">

            <form
                onSubmit={onSubmitHandler}
                className="w-full max-w-md p-8 rounded-2xl flex flex-col gap-5"
            >

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">{step}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome to Ravi Creation
                    </p>
                </div>

                {/* SIGN UP */}
                {step === 'Sign Up' && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
                        required
                    />
                )}

                {/* EMAIL FIELD */}
                {(step === 'Login' || step === 'Sign Up' || step === 'Forgot Password') && (
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
                        required
                    />
                )}

                {/* PASSWORD FIELD */}
                {(step === 'Login' || step === 'Sign Up') && (
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
                        required
                    />
                )}

                {/* OTP FIELD */}
                {step === 'Verify OTP' && (
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition text-center tracking-widest"
                        required
                    />
                )}

                {/* RESET PASSWORD FIELDS */}
                {step === 'Reset Password' && (
                    <>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
                            required
                        />
                    </>
                )}

                {/* BUTTON */}
                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300 font-medium">
                    {step === 'Login' && 'Sign In'}
                    {step === 'Sign Up' && 'Create Account'}
                    {step === 'Forgot Password' && 'Send OTP'}
                    {step === 'Verify OTP' && 'Verify OTP'}
                    {step === 'Reset Password' && 'Change Password'}
                </button>

                {/* BOTTOM LINKS */}
                <div className="text-sm text-gray-600 text-center space-y-2">

                    {step === 'Login' && (
                        <>
                            <p
                                onClick={() => setStep('Forgot Password')}
                                className="cursor-pointer hover:text-black transition"
                            >
                                Forgot Password?
                            </p>

                            <p
                                onClick={() => setStep('Sign Up')}
                                className="cursor-pointer hover:text-black transition"
                            >
                                Don’t have an account? Sign Up
                            </p>
                        </>
                    )}

                    {step === 'Sign Up' && (
                        <p
                            onClick={() => setStep('Login')}
                            className="cursor-pointer hover:text-black transition"
                        >
                            Already have an account? Login
                        </p>
                    )}

                    {(step === 'Forgot Password' || step === 'Verify OTP' || step === 'Reset Password') && (
                        <p
                            onClick={() => setStep('Login')}
                            className="cursor-pointer hover:text-black transition"
                        >
                            Back to Login
                        </p>
                    )}
                </div>

            </form>
        </div>
    )
}

export default Login