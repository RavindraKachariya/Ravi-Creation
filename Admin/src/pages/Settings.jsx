import { useState } from 'react'
import { Save, Store, Bell, Shield, Palette, Globe, CreditCard } from 'lucide-react'

const tabs = [
    { label: 'General', icon: <Store size={16} /> },
    { label: 'Notifications', icon: <Bell size={16} /> },
    { label: 'Security', icon: <Shield size={16} /> },
    { label: 'Appearance', icon: <Palette size={16} /> },
    { label: 'Payment', icon: <CreditCard size={16} /> },
    { label: 'Localization', icon: <Globe size={16} /> },
]

const Settings = () => {
    const [activeTab, setActiveTab] = useState('General')
    const [saved, setSaved] = useState(false)

    const [general, setGeneral] = useState({
        storeName: 'Ravi Creation',
        email: 'ravicreation@gmail.com',
        phone: '+91 91062 38665',
        address: 'A 75, Avdhut Nagar Sco Katargam, Surat - 395004',
        currency: 'INR',
        timezone: 'Asia/Kolkata',
        language: 'English',
    })

    const [notifications, setNotifications] = useState({
        newOrder: true,
        lowStock: true,
        newCustomer: false,
        paymentReceived: true,
        orderCancelled: true,
        weeklyReport: false,
    })

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500 mt-0.5">Manage your store preferences</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Tabs */}
                <div className="md:w-52 shrink-0">
                    <div className="bg-white rounded-xl border border-gray-200 p-2 space-y-1 md:sticky md:top-20">
                        {tabs.map(tab => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.label)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                                ${activeTab === tab.label ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-5">
                    {activeTab === 'General' && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                            <h2 className="font-semibold text-gray-800 pb-3 border-b border-gray-100">Store Information</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Name</label>
                                    <input type="text" value={general.storeName} onChange={e => setGeneral({ ...general, storeName: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                    <input type="email" value={general.email} onChange={e => setGeneral({ ...general, email: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                    <input type="text" value={general.phone} onChange={e => setGeneral({ ...general, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
                                    <select value={general.currency} onChange={e => setGeneral({ ...general, currency: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition bg-white cursor-pointer">
                                        {['INR', 'USD', 'EUR', 'GBP'].map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Address</label>
                                <textarea value={general.address} onChange={e => setGeneral({ ...general, address: e.target.value })}
                                    rows={2} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition resize-none" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
                                    <select value={general.timezone} onChange={e => setGeneral({ ...general, timezone: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition bg-white cursor-pointer">
                                        {['Asia/Kolkata', 'UTC', 'America/New_York', 'Europe/London'].map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
                                    <select value={general.language} onChange={e => setGeneral({ ...general, language: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition bg-white cursor-pointer">
                                        {['English', 'Hindi', 'French', 'Spanish'].map(l => <option key={l}>{l}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Notifications' && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                            <h2 className="font-semibold text-gray-800 pb-3 border-b border-gray-100">Email Notifications</h2>
                            <div className="space-y-4">
                                {Object.entries(notifications).map(([key, val]) => {
                                    const labels = {
                                        newOrder: 'New Order Received',
                                        lowStock: 'Low Stock Alert',
                                        newCustomer: 'New Customer Registered',
                                        paymentReceived: 'Payment Received',
                                        orderCancelled: 'Order Cancelled',
                                        weeklyReport: 'Weekly Report',
                                    }
                                    const descriptions = {
                                        newOrder: 'Get notified when a new order is placed',
                                        lowStock: 'Alert when product stock falls below threshold',
                                        newCustomer: 'Notify when a new customer registers',
                                        paymentReceived: 'Confirm when payment is successfully received',
                                        orderCancelled: 'Alert when an order is cancelled',
                                        weeklyReport: 'Receive weekly performance summary',
                                    }
                                    return (
                                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{labels[key]}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{descriptions[key]}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={val}
                                                    onChange={() => setNotifications({ ...notifications, [key]: !val })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4.5 after:w-4 after:transition-all peer-checked:bg-black h-5 after:h-4 after:w-4.5 w-9" />
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Security' && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                            <h2 className="font-semibold text-gray-800 pb-3 border-b border-gray-100">Change Password</h2>
                            <div className="space-y-4 max-w-sm">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">Enable 2FA</p>
                                        <p className="text-xs text-gray-400 mt-0.5">Add an extra layer of security to your account</p>
                                    </div>
                                    <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                                        Enable
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Appearance' && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                            <h2 className="font-semibold text-gray-800 pb-3 border-b border-gray-100">Theme Settings</h2>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">Color Theme</p>
                                <div className="flex gap-3">
                                    {['#000000', '#1e40af', '#15803d', '#7c3aed', '#dc2626'].map(color => (
                                        <button
                                            key={color}
                                            className="w-8 h-8 rounded-full border-2 border-white shadow-md ring-2 ring-gray-200 hover:ring-black transition"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">Mode</p>
                                <div className="flex gap-3">
                                    {['Light', 'Dark', 'System'].map(mode => (
                                        <button key={mode} className={`px-4 py-2 border rounded-lg text-sm ${mode === 'Light' ? 'border-black bg-gray-50 font-medium' : 'border-gray-200 text-gray-500 hover:border-gray-400'} transition`}>
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Payment' && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                            <h2 className="font-semibold text-gray-800 pb-3 border-b border-gray-100">Payment Gateways</h2>
                            {[
                                { name: 'Razorpay', desc: 'Accepts cards, UPI, wallets', active: true },
                                { name: 'Stripe', desc: 'International cards and payments', active: false },
                                { name: 'Cash on Delivery', desc: 'Pay when you receive your order', active: true },
                                { name: 'PayPal', desc: 'Secure online payments', active: false },
                            ].map((gw, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{gw.name}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{gw.desc}</p>
                                    </div>
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${gw.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                        {gw.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Localization' && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                            <h2 className="font-semibold text-gray-800 pb-3 border-b border-gray-100">Regional Settings</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: 'Country', options: ['India', 'USA', 'UK', 'Australia'] },
                                    { label: 'Currency Format', options: ['₹ 1,00,000', '$1,000', '€1.000'] },
                                    { label: 'Date Format', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] },
                                    { label: 'Weight Unit', options: ['kg', 'lbs', 'g'] },
                                ].map((f, i) => (
                                    <div key={i}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                                        <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition bg-white cursor-pointer">
                                            {f.options.map(o => <option key={o}>{o}</option>)}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition ${saved ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-900'}`}
                    >
                        <Save size={16} />
                        {saved ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings
