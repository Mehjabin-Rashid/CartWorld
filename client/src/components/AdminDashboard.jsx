import React, { useState } from 'react'
import AdminProducts from './AdminProducts'
import { formatBDT } from '../utils/formatCurrency'

// Keep stats simple; these are placeholders and should be wired to real data.

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [section, setSection] = useState('overview') // 'overview' | 'products' | 'orders' | 'settings'

  function Menu() {
    return (
      <div className="relative">
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow"
        >
          Dashboard Menu
          <span className="text-gray-600">▾</span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md border bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow z-10">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'products', label: 'Manage Products' },
              { key: 'orders', label: 'Orders' },
              { key: 'settings', label: 'Settings' },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => {
                  setSection(item.key)
                  setMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white ${
                  section === item.key ? 'font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <Menu />
      </div>

      {section === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow rounded p-4">
              <div className="text-sm text-gray-500">Total Orders</div>
              <div className="text-2xl font-bold mt-1"></div>
            </div>

            <div className="bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow rounded p-4">
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-2xl font-bold mt-1">{formatBDT()}</div>
            </div>

            <div className="bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow rounded p-4">
              <div className="text-sm text-gray-500">Active Users</div>
              <div className="text-2xl font-bold mt-1"></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow rounded p-4">
            <h3 className="text-lg font-medium mb-2">Recent Orders</h3>
            <p className="text-sm text-gray-500">This is a placeholder for recent orders table. Replace with live data as needed.</p>
          </div>
        </>
      )}

      {section === 'products' && (
        <AdminProducts />
      )}

      {section === 'orders' && (
        <div className="bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow rounded p-4">
          <h3 className="text-lg font-medium mb-2">Orders</h3>
          <p className="text-sm text-gray-500">Orders management goes here.</p>
        </div>
      )}

      {section === 'settings' && (
        <div className="bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow rounded p-4">
          <h3 className="text-lg font-medium mb-2">Settings</h3>
          <p className="text-sm text-gray-500">Store settings, profile, etc.</p>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
