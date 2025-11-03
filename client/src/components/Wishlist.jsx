import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatBDT } from '../utils/formatCurrency'

const STORAGE_KEY = 'cw_wishlist'

// Example shape: { id, name, price, description }

const loadFromStorage = () => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		return raw ? JSON.parse(raw) : []
	} catch (e) {
		return []
	}
}

const saveToStorage = (items) => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
	} catch (e) {
		// ignore
	}
}

export default function Wishlist({ onMoveToCart }) {
	const [items, setItems] = useState(() => loadFromStorage())
	const [toast, setToast] = useState('')

	useEffect(() => {
		saveToStorage(items)
	}, [items])

	const count = useMemo(() => items.length, [items])

	function removeItem(id) {
		setItems((prev) => prev.filter((p) => p.id !== id))
	}

	function clearAll() {
		setItems([])
	}

	function handleMoveToCart(item) {
		if (onMoveToCart) onMoveToCart(item)
		setItems((prev) => prev.filter((p) => p.id !== item.id))
		setToast(`${item.name} moved to cart`)
		setTimeout(() => setToast(''), 1600)
	}

	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-semibold">Wishlist</h1>
					<span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700">{count}</span>
				</div>
				{count > 0 && (
					<button
						onClick={clearAll}
						className="text-sm text-red-600 hover:underline"
					>
						Clear all
					</button>
				)}
			</div>

			{toast && (
				<div className="mb-3 rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
					{toast}
				</div>
			)}

			{count === 0 ? (
				<EmptyState />
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((item) => (
						<div key={item.id} className="flex flex-col rounded border border-gray-200 bg-white p-4 shadow-sm">
							<div className="flex h-36 items-center justify-center rounded bg-gray-50 text-gray-400">
								Image
							</div>
							<div className="mt-3 flex-1">
								<div className="text-base font-medium text-gray-900">{item.name}</div>
								{item.description && (
									<div className="mt-1 line-clamp-2 text-sm text-gray-500">{item.description}</div>
								)}
							</div>
							<div className="mt-3 flex items-center justify-between">
								<div className="text-lg font-semibold">{formatBDT(item.price || 0)}</div>
								<div className="flex items-center gap-2">
									<button
										onClick={() => handleMoveToCart(item)}
										className="rounded bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-black/90"
									>
										Move to cart
									</button>
									<button
										onClick={() => removeItem(item.id)}
										className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

function EmptyState() {
	return (
		<div className="flex flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-white p-10 text-center">
			<div className="mb-3 rounded-full bg-gray-100 p-3">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-600">
					<path d="M2.25 3a.75.75 0 0 0 0 1.5H3.9l2.403 9.612A3.75 3.75 0 0 0 10.94 17.25h6.56a3.75 3.75 0 0 0 3.637-2.738l1.45-5.437A.75.75 0 0 0 21.86 8.7l-1.45 5.437a2.25 2.25 0 0 1-2.91 1.613l-11.23-3.86L4.35 4.5h15.9a.75.75 0 0 0 0-1.5H2.25Z" />
					<path d="M10.5 20.25a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm9-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
				</svg>
			</div>
			<h2 className="text-lg font-semibold text-gray-900">Your wishlist is empty</h2>
			<p className="mt-1 text-sm text-gray-600">Save items you love and find them here anytime.</p>
			<Link
				to="/categories"
				className="mt-4 inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
			>
				Browse categories
			</Link>
		</div>
	)
}

