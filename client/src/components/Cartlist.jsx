import React, { useEffect, useMemo, useState } from 'react'
import { formatBDT } from '../utils/formatCurrency'

const CART_KEY = 'cw_cart'
const WISHLIST_KEY = 'cw_wishlist'

function loadCart() {
	try {
		const raw = localStorage.getItem(CART_KEY)
		return raw ? JSON.parse(raw) : []
	} catch {
		return []
	}
}

function saveCart(items) {
	try {
		localStorage.setItem(CART_KEY, JSON.stringify(items))
	} catch {}
}

function moveToWishlist(item) {
	try {
		const raw = localStorage.getItem(WISHLIST_KEY)
		const arr = raw ? JSON.parse(raw) : []
		if (!arr.find(p => p.id === item.id)) {
			arr.push({ id: item.id, name: item.name, price: item.price, description: item.description })
			localStorage.setItem(WISHLIST_KEY, JSON.stringify(arr))
		}
	} catch {}
}

export default function Cartlist() {
	const [items, setItems] = useState(() => loadCart())

	useEffect(() => {
		saveCart(items)
	}, [items])

	const subtotal = useMemo(
		() => items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0),
		[items]
	)

	function inc(id) {
		setItems(prev => prev.map(it => it.id === id ? { ...it, qty: (it.qty || 1) + 1 } : it))
	}

	function dec(id) {
		setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, (it.qty || 1) - 1) } : it))
	}

	function removeItem(id) {
		setItems(prev => prev.filter(it => it.id !== id))
	}

	function clearCart() {
		setItems([])
	}

	function handleMoveToWishlist(it) {
		moveToWishlist(it)
		removeItem(it.id)
	}

	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h2 className="text-xl font-semibold">Cart</h2>
					<span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700">{items.length}</span>
				</div>
				{items.length > 0 && (
					<button onClick={clearCart} className="text-sm text-red-600 hover:underline">Clear cart</button>
				)}
			</div>

			{items.length === 0 ? (
				<EmptyCart />
			) : (
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2 space-y-3">
						{items.map(it => (
							<div key={it.id} className="flex gap-4 rounded border border-gray-200 bg-white p-4 shadow-sm">
								<div className="h-24 w-24 shrink-0 overflow-hidden rounded bg-gray-50">
									{it.img ? (
										<img src={it.img} alt={it.name} className="h-full w-full object-cover" loading="lazy" />
									) : (
										<div className="flex h-full w-full items-center justify-center text-gray-400">Image</div>
									)}
								</div>
								<div className="flex min-w-0 flex-1 flex-col">
									<div className="flex items-start justify-between gap-3">
										<div className="min-w-0">
											<div className="truncate text-sm font-semibold text-gray-900">{it.name}</div>
											{it.description && (
												<div className="mt-1 line-clamp-2 text-xs text-gray-500">{it.description}</div>
											)}
										</div>
										<div className="text-sm font-semibold text-gray-900">{formatBDT((it.price || 0) * (it.qty || 1))}</div>
									</div>
									<div className="mt-3 flex flex-wrap items-center gap-2">
										<div className="inline-flex items-center rounded border border-gray-300">
											<button onClick={() => dec(it.id)} className="px-2 py-1 text-sm">−</button>
											<input
												value={it.qty || 1}
												onChange={e => {
													const v = Math.max(1, parseInt(e.target.value || '1', 10))
													setItems(prev => prev.map(p => p.id === it.id ? { ...p, qty: v } : p))
												}}
												className="w-12 border-l border-r border-gray-200 px-2 py-1 text-center text-sm"
												type="number"
												min={1}
											/>
											<button onClick={() => inc(it.id)} className="px-2 py-1 text-sm">+</button>
										</div>
										<button onClick={() => handleMoveToWishlist(it)} className="text-xs text-gray-700 underline">
											Move to wishlist
										</button>
										<button onClick={() => removeItem(it.id)} className="text-xs text-red-600 underline">
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					<aside className="h-max rounded border border-gray-200 bg-white p-4 shadow-sm">
						<h3 className="text-base font-semibold text-gray-900">Order summary</h3>
						<div className="mt-3 space-y-2 text-sm">
							<div className="flex justify-between"><span>Subtotal</span><span>{formatBDT(subtotal)}</span></div>
							<div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
							<div className="flex justify-between"><span>Tax</span><span>—</span></div>
						</div>
						<div className="mt-3 border-t pt-3 text-sm font-semibold flex justify-between">
							<span>Total</span>
							<span>{formatBDT(subtotal)}</span>
						</div>
						<button className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black/90">
							Checkout
						</button>
					</aside>
				</div>
			)}
		</div>
	)
}

function EmptyCart() {
	return (
		<div className="flex flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-white p-10 text-center">
			<div className="mb-3 rounded-full bg-gray-100 p-3">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-600">
					<path d="M2.25 3a.75.75 0 0 0 0 1.5H3.9l2.403 9.612A3.75 3.75 0 0 0 10.94 17.25h6.56a3.75 3.75 0 0 0 3.637-2.738l1.45-5.437A.75.75 0 0 0 21.86 8.7l-1.45 5.437a2.25 2.25 0 0 1-2.91 1.613l-11.23-3.86L4.35 4.5h15.9a.75.75 0 0 0 0-1.5H2.25Z" />
					<path d="M10.5 20.25a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm9-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
				</svg>
			</div>
			<h2 className="text-lg font-semibold text-gray-900">Your cart is empty</h2>
			<p className="mt-1 text-sm text-gray-600">Add items from Categories or your Wishlist.</p>
		</div>
	)
}

