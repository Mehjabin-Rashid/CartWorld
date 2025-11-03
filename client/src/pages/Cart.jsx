import React from 'react'
import Cartlist from '../components/Cartlist'

export default function CartPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
        <p className="mt-1 text-sm text-gray-600">Review your items, update quantities, or proceed to checkout.</p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Cartlist />
      </div>
    </div>
  )
}

