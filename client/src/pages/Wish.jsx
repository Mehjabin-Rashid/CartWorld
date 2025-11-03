import React from 'react'
import Wishlist from '../components/Wishlist'

const CART_STORAGE = 'cw_cart'

function addToCartStorage(item) {
	try {
		const raw = localStorage.getItem(CART_STORAGE)
		const arr = raw ? JSON.parse(raw) : []
		const exists = arr.find(p => p.id === item.id)
		if (exists) {
			exists.qty = (exists.qty || 1) + 1
		} else {
			arr.push({ ...item, qty: 1 })
		}
		localStorage.setItem(CART_STORAGE, JSON.stringify(arr))
	} catch (e) {
		// ignore persistence errors
	}
}

export default function Wish() {
	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8">
			<div className="mb-4">
				<h1 className="text-2xl font-semibold text-gray-900">Your Wishlist</h1>
				<p className="mt-1 text-sm text-gray-600">Save items you love and move them to your cart anytime.</p>
			</div>
			<div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
				<Wishlist onMoveToCart={addToCartStorage} />
			</div>
		</div>
	)
}

