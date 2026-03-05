import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOtp from './pages/VerifyOtp'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Customers from './pages/Customers'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

const App = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <h1 className="text-5xl font-bold text-gray-100">404</h1>
            <p className="text-sm text-gray-400 mt-2">Page not found</p>
          </div>
        } />
      </Route>
    </Routes>
  )
}

export default App
