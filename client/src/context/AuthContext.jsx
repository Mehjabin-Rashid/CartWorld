import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('cw_user')
      return raw ? JSON.parse(raw) : null
    } catch (e) {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) localStorage.setItem('cw_user', JSON.stringify(user))
      else localStorage.removeItem('cw_user')
    } catch (e) {
      // ignore
    }
  }, [user])

  function login({ name = 'User', role = 'user' }) {
    // In real app, call API and receive token/user
    const u = { name, role }
    setUser(u)
    return u
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
