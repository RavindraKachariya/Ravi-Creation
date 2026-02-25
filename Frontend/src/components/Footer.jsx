import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-gray-50 mt-20'>

            <div className='w-full mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm'>

                {/* Logo & About */}
                <div>
                    <img src={assets.logo} className='w-44 mb-5' alt="Logo" />
                    <p className='text-gray-600 leading-6'>
                        Ravi Creation is your trusted fashion destination.
                        We deliver premium quality products with love and care across India.
                    </p>

                    {/* Social Icons */}
                    <div className='flex gap-4 mt-5'>
                        <img src={assets.facebook_icon} alt="" className='w-5 cursor-pointer hover:scale-110 transition' />
                        <img src={assets.instagram_icon} alt="" className='w-5 cursor-pointer hover:scale-110 transition' />
                        <img src={assets.twitter_icon} alt="" className='w-5 cursor-pointer hover:scale-110 transition' />
                    </div>
                </div>

                {/* Company Links */}
                <div>
                    <p className='text-lg font-semibold mb-4'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <Link to='/' className='hover:text-black transition'>Home</Link>
                        <Link to='/about' className='hover:text-black transition'>About Us</Link>
                        <Link to='/collection' className='hover:text-black transition'>Collection</Link>
                        <li className='hover:text-black cursor-pointer transition'>Privacy Policy</li>
                        <li className='hover:text-black cursor-pointer transition'>Terms & Conditions</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <p className='text-lg font-semibold mb-4'>CONTACT</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>📍 A-75 Avdhut Nagar Society, Surat, India</li>
                        <li>📞 +91 9106238665</li>
                        <li>✉️ ravindrakachariya@gmail.com</li>
                        <li>🕒 Mon - Sat: 9AM - 8PM</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <p className='text-lg font-semibold mb-4'>NEWSLETTER</p>
                    <p className='text-gray-600 mb-4'>
                        Subscribe to get latest offers and updates.
                    </p>

                    <div className='flex border rounded overflow-hidden'>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className='w-full px-3 py-2 outline-none text-sm'
                        />
                        <button className='bg-black text-white px-4 hover:bg-gray-800 transition'>
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Section */}
            <div className='border-t'>
                <div className='max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600'>
                    <p>© 2026 Ravi Creation. All Rights Reserved.</p>

                    <div className='flex gap-6 mt-3 md:mt-0'>
                        <p className='hover:text-black cursor-pointer transition'>Privacy Policy</p>
                        <p className='hover:text-black cursor-pointer transition'>Terms</p>
                        <p className='hover:text-black cursor-pointer transition'>Support</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer