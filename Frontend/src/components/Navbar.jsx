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
        <div className='flex items-center justify-between py-4 px-4 md:px-8 font-medium shadow-sm'>

            {/* LOGO */}
            <Link to='/' className='group'>
                <img
                    src={assets.logo}
                    alt="Logo"
                    className='w-44 transition-transform duration-300 group-hover:scale-105'
                />
            </Link>

            {/* DESKTOP MENU */}
            <ul className='hidden sm:flex gap-8 text-sm text-gray-700'>
                {["/", "/collection", "/about", "/contact"].map((path, index) => {
                    const names = ["HOME", "COLLECTION", "ABOUT", "CONTACT"]
                    return (
                        <NavLink
                            key={index}
                            to={path}
                            className={({ isActive }) =>
                                `relative pb-1 transition duration-300 ${isActive ? "text-black" : "hover:text-black"
                                }`
                            }
                        >
                            {names[index]}
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                    )
                })}
            </ul>

            {/* RIGHT SECTION */}
            <div className='flex items-center gap-6'>

                {/* SEARCH */}
                <img
                    src={assets.search_icon}
                    alt="Search"
                    className='w-5 cursor-pointer hover:scale-110 transition'
                />

                {/* PROFILE */}
                <div className='relative group'>

                    <img
                        onClick={() => !user && navigate('/login')}
                        src={assets.profile_icon}
                        alt="User"
                        className='w-5 cursor-pointer hover:scale-110 transition'
                    />

                    {user && (
                        <div className='absolute right-0 mt-3 w-44 bg-white shadow-xl rounded-lg py-2 
                                    opacity-0 translate-y-2 group-hover:opacity-100 
                                    group-hover:translate-y-0 invisible 
                                    group-hover:visible transition-all duration-300 z-50'>

                            <div className='px-4 py-2 text-sm text-gray-700 border-b font-medium'>
                                {user.name}
                            </div>

                            <button
                                onClick={() => navigate('/orders')}
                                className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition'
                            >
                                My Orders
                            </button>

                            <button
                                onClick={handleLogout}
                                className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition'
                            >
                                Logout
                            </button>

                        </div>
                    )}
                </div>

                {/* CART */}
                <Link to='/cart' className='relative'>
                    <img
                        src={assets.cart_icon}
                        alt="Cart"
                        className='w-5 cursor-pointer hover:scale-110 transition'
                    />

                    {getCartCount() > 0 && (
                        <span className='absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse'>
                            {getCartCount()}
                        </span>
                    )}
                </Link>

                {/* MOBILE MENU ICON */}
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    alt="Menu"
                    className='w-5 cursor-pointer sm:hidden hover:scale-110 transition'
                />
            </div>

            {/* MOBILE SIDEBAR */}
            <div className={`fixed top-0 right-0 h-full bg-white shadow-lg 
                        transition-all duration-300 z-50 
                        ${visible ? 'w-72' : 'w-0 overflow-hidden'}`}>

                <div className='flex flex-col text-gray-700 h-full w-full px-6'>

                    <div
                        onClick={() => setVisible(false)}
                        className='py-6 text-lg font-semibold cursor-pointer'
                    >
                        ✕ Close
                    </div>

                    <NavLink onClick={() => setVisible(false)} to='/' className='py-4 border-t hover:text-black'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className='py-4 border-t hover:text-black'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/about' className='py-4 border-t hover:text-black'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/contact' className='py-4 border-t hover:text-black'>CONTACT</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navbar