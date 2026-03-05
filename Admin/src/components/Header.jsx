import { useState, useRef, useEffect } from 'react'
import { Bell, Search, ChevronDown, Menu, User, Settings, LogOut, X, Package, ShoppingCart, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const notifications = [
    { id: 1, icon: <ShoppingCart size={15} className="text-blue-500" />, title: 'New Order', msg: 'Order #ORD-012 placed by Rahul', time: '5 min ago', read: false },
    { id: 2, icon: <Package size={15} className="text-green-500" />, title: 'Product Low Stock', msg: 'Wooden Car Hanger - Walnut: 8 left', time: '1 hr ago', read: false },
    { id: 3, icon: <ShoppingCart size={15} className="text-blue-500" />, title: 'New Order', msg: 'Order #ORD-011 placed by Priya', time: '2 hr ago', read: true },
    { id: 4, icon: <AlertCircle size={15} className="text-red-500" />, title: 'Out of Stock', msg: 'Metal Car Hanger - Matte Black is out', time: '3 hr ago', read: true },
]

const Header = ({ onMenuClick }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [notifs, setNotifs] = useState(notifications)
    const dropdownRef = useRef(null)
    const notifRef = useRef(null)
    const navigate = useNavigate()

    const unreadCount = notifs.filter(n => !n.read).length

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotifOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))

    const handleProfile = () => { setDropdownOpen(false); navigate('/profile') }
    const handleSettings = () => { setDropdownOpen(false); navigate('/settings') }
    const handleLogout = () => { setDropdownOpen(false); navigate('/login') }

    return (
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
            {/* Left */}
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition">
                    <Menu size={20} className="text-gray-500" />
                </button>
                <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 w-64">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-sm outline-none w-full text-gray-600 placeholder-gray-300"
                    />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false) }}
                        className="relative p-2 rounded-lg hover:bg-gray-50 transition"
                    >
                        <Bell size={20} className="text-gray-500" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {notifOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl border border-gray-100 z-50 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-800">Notifications</span>
                                    {unreadCount > 0 && (
                                        <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">{unreadCount}</span>
                                    )}
                                </div>
                                {unreadCount > 0 && (
                                    <button onClick={markAllRead} className="text-xs text-gray-400 hover:text-black transition">
                                        Mark all read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                                {notifs.map(n => (
                                    <div
                                        key={n.id}
                                        className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer ${!n.read ? 'bg-blue-50/30' : ''}`}
                                        onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                                    >
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                            {n.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-gray-800">{n.title}</p>
                                            <p className="text-xs text-gray-400 truncate">{n.msg}</p>
                                            <p className="text-[10px] text-gray-300 mt-0.5">{n.time}</p>
                                        </div>
                                        {!n.read && <div className="w-2 h-2 bg-black rounded-full shrink-0 mt-1.5" />}
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2.5 border-t border-gray-50">
                                <button
                                    onClick={() => setNotifOpen(false)}
                                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-black transition w-full justify-center"
                                >
                                    <X size={11} /> Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false) }}
                        className="flex items-center gap-2.5 hover:bg-gray-50 rounded-lg px-3 py-2 transition"
                    >
                        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            A
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-medium text-gray-800">Admin</p>
                            <p className="text-xs text-gray-400">Super Admin</p>
                        </div>
                        <ChevronDown size={15} className="text-gray-400" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-1.5 z-50">
                            <button onClick={handleProfile}
                                className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                                <User size={15} className="text-gray-400" />
                                My Profile
                            </button>
                            <button onClick={handleSettings}
                                className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                                <Settings size={15} className="text-gray-400" />
                                Account Settings
                            </button>
                            <div className="my-1 border-t border-gray-100" />
                            <button onClick={handleLogout}
                                className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-50 transition">
                                <LogOut size={15} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
