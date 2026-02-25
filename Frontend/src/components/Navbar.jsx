import { assets } from '../assets/assets'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'

const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const [user, setUser] = useState(null)
    const { getCartCount } = useContext(ShopContext)

    const navigate = useNavigate()

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user")

            if (storedUser && storedUser !== "undefined") {
                setUser(JSON.parse(storedUser))
            }
        } catch (error) {
            console.log("Invalid user data in localStorage")
            setUser(null)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user")
        setUser(null)
        navigate('/')
    }

    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <Link to='/'>
                <img src={assets.logo} alt="Logo" className='w-36' />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>

                <img src={assets.search_icon} alt="Search" className='w-5 cursor-pointer' />

                {/* Profile Section */}
                <div className='relative group'>

                    <img
                        onClick={() => !user && navigate('/login')}
                        src={assets.profile_icon}
                        alt="User"
                        className='w-5 cursor-pointer'
                    />

                    {user && (
                        <div className='absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50'>

                            <div className='px-4 py-2 text-sm text-gray-700 border-b'>
                                {user.name}
                            </div>

                            {/* ✅ My Orders Button */}
                            <button
                                onClick={() => navigate('/orders')}
                                className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition'
                            >
                                My Orders
                            </button>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition'
                            >
                                Logout
                            </button>

                        </div>
                    )}

                </div>

                <Link to='/cart' className='relative'>
                    <img
                        src={assets.cart_icon}
                        alt="Cart"
                        className='w-5 cursor-pointer min-w-5'
                    />

                    {/* Cart Count Badge */}
                    {getCartCount() > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full'>
                            {getCartCount()}
                        </span>
                    )}
                </Link>

                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    alt="Menu"
                    className='w-5 cursor-pointer sm:hidden'
                />
            </div>

            {/* Mobile Sidebar */}
            <div className={`absolute top-0 right-0 bottom-0 bg-white transition-all duration-300 z-50 ${visible ? 'w-full' : 'w-0 overflow-hidden'}`}>
                <div className='flex flex-col text-gray-600 h-full w-full px-5'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <p>Back</p>
                    </div>

                    <NavLink onClick={() => setVisible(false)} to='/' className='py-5 border-t'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className='py-5 border-t'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/about' className='py-5 border-t'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/contact' className='py-5 border-t'>CONTACT</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navbar