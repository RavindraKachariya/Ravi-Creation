import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    PlusCircle,
} from 'lucide-react'
import logo from '../assets/logo.png'

const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/' },
    { label: 'Products', icon: <Package size={18} />, path: '/products' },
    { label: 'Add Product', icon: <PlusCircle size={18} />, path: '/add-product' },
    { label: 'Orders', icon: <ShoppingCart size={18} />, path: '/orders' },
    { label: 'Customers', icon: <Users size={18} />, path: '/customers' },
    { label: 'Settings', icon: <Settings size={18} />, path: '/settings' },
]

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <aside
            className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 sticky top-0 ${collapsed ? 'w-16' : 'w-56'}`}
        >
            {/* Logo */}
            <div className={`flex items-center justify-between px-4 py-1 border-b border-gray-100 ${collapsed ? 'justify-center' : ''}`}>
                {!collapsed && (
                    <div>
                        <img src={logo} alt="Logo" className="h-26 object-contain" />
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded-lg hover:bg-gray-100 transition text-gray-400"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                            ${isActive ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`
                        }
                    >
                        <span className="shrink-0">{item.icon}</span>
                        {!collapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom logout */}
            <div className="p-2 border-t border-gray-100">
                <NavLink
                    to="/login"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 transition-all duration-150"
                >
                    <LogOut size={18} />
                    {!collapsed && <span>Logout</span>}
                </NavLink>
            </div>
        </aside>
    )
}

export default Sidebar
