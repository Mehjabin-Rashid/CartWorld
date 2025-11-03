import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import UserDashboard from '../components/UserDashboard'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()

  // If no user, redirect to login (route also protected by App but this is a safe-guard)
  if (!user) return <Navigate to="/login" replace />

  // Render based on role (seller/admin act as admin dashboard)
  if (user.role === 'seller' || user.role === 'admin') return <AdminDashboard />
  return <UserDashboard />
}

export default Dashboard
