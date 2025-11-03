import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Signup from './components/Signup.jsx'
import LoginForm from './components/LoginForm.jsx'
import CartPage from './pages/Cart.jsx'
import Categories from './pages/Categories.jsx'
import Wish from './pages/Wish.jsx'
import { AuthProvider, useAuth } from './context/AuthContext'

// Simple protected route wrapper
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

const Nav = () => {
  const { user, logout } = useAuth()
  return (
    <nav className="bg-gradient-to-r from-cyan-300 via-white to-teal-400 shadow px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
  <div className="text-xl font-bold text-fuchsia-700">CartWorld</div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm font-semibold text-fuchsia-500 hover:underline">Home</Link>
          <Link to="/categories" className="text-sm font-semibold text-fuchsia-500 hover:underline">Categories</Link>
          <Link to="/wishlist" className="text-sm font-semibold text-fuchsia-500 hover:underline">Wishlist</Link>
          <Link to="/dashboard" className="text-sm font-semibold text-fuchsia-500 hover:underline">Dashboard</Link>
          <Link to="/cart" className="text-sm font-semibold text-fuchsia-500 hover:underline">Cart</Link>
          {user ? (
            <>
              <span className="text-sm font-semibold text-fuchsia-500">Hi, {user.name}</span>
              <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-fuchsia-500 hover:underline">Login</Link>
              <Link to="/signup" className="text-sm font-semibold text-fuchsia-500 hover:underline">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900">
          <Nav />

          <main className="max-w-6xl mx-auto p-4">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><Wish /></ProtectedRoute>} />
              <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
