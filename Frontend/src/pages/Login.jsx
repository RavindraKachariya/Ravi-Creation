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
        <div>
            <form
                onSubmit={onSubmitHandler}
                className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
            >

                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <p className='text-3xl'>{step}</p>
                    <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
                </div>

                {/* SIGN UP */}
                {step === 'Sign Up' && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-800'
                        required
                    />
                )}

                {/* EMAIL FIELD */}
                {(step === 'Login' || step === 'Sign Up' || step === 'Forgot Password') && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-800'
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
                        className='w-full px-3 py-2 border border-gray-800'
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
                        className='w-full px-3 py-2 border border-gray-800'
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
                            className='w-full px-3 py-2 border border-gray-800'
                            required
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-800'
                            required
                        />
                    </>
                )}

                {/* BOTTOM LINKS */}
                <div className='w-full flex justify-between text-sm'>

                    {step === 'Login' && (
                        <>
                            <p onClick={() => setStep('Forgot Password')} className='cursor-pointer'>
                                Forgot Password?
                            </p>
                            <p onClick={() => setStep('Sign Up')} className='cursor-pointer'>
                                Create Account
                            </p>
                        </>
                    )}

                    {step === 'Sign Up' && (
                        <p onClick={() => setStep('Login')} className='cursor-pointer'>
                            Login Here
                        </p>
                    )}

                    {(step === 'Forgot Password' || step === 'Verify OTP' || step === 'Reset Password') && (
                        <p onClick={() => setStep('Login')} className='cursor-pointer'>
                            Back to Login
                        </p>
                    )}
                </div>

                <button className='bg-black text-white px-8 py-2 mt-4'>
                    {step === 'Login' && 'Sign In'}
                    {step === 'Sign Up' && 'Sign Up'}
                    {step === 'Forgot Password' && 'Send OTP'}
                    {step === 'Verify OTP' && 'Verify OTP'}
                    {step === 'Reset Password' && 'Change Password'}
                </button>

            </form>
        </div>
    )
}

export default Login