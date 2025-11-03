import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard'

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.trim() || !password) {
      setError('Email and password are required')
      return
    }
    setError('')
    try {
      setLoading(true)
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim(), password, role: role === 'user' ? 'customer' : role }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.status !== 'success') {
        setError(data?.message || 'Invalid credentials')
        return
      }
      const user = data?.data?.user || {}
      const name = user?.name || email.trim()
      const effectiveRole = user?.role || (role === 'user' ? 'customer' : role)
      login({ name, role: effectiveRole })
      navigate(from, { replace: true })
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow rounded p-6 text-black">
      <h2 className="text-xl font-semibold mb-4 text-black">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label className="block text-sm text-black">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            className={`mt-1 block w-full border rounded px-2 py-1 text-black ${error ? 'border-red-500' : ''}`}
            aria-invalid={!!error}
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm text-black">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                if (error) setError('')
              }}
              className={`mt-1 block w-full border rounded px-2 py-1 pr-16 text-black ${error ? 'border-red-500' : ''}`}
              aria-invalid={!!error}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(s => !s)}
              className="absolute inset-y-0 right-2 my-auto text-sm text-blue-600 hover:text-blue-700"
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm text-black">Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1 text-black"
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        

        <div className="flex items-center justify-between">
          <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        <span>Don't have an account? </span>
        <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">Sign up</Link>
      </div>
    </div>
  )
}

export default LoginForm
