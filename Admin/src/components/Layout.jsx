import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar - Desktop */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Sidebar - Mobile Overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}
            <div className={`fixed top-0 left-0 h-full z-50 md:hidden transition-transform duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setMobileSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout
