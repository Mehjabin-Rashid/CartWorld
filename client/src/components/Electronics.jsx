import React, { useMemo, useState } from 'react'
import { formatBDT } from '../utils/formatCurrency'

const CART_KEY = 'cw_cart'
const WISHLIST_KEY = 'cw_wishlist'

const categories = ['All', 'Phones', 'Laptops', 'Audio', 'Accessories', 'Wearables']

const sampleElectronics = [
	{
		id: 'el-1',
		name: 'Wireless Over‑Ear Headphones',
		price: 12999,
		category: 'Audio',
		rating: 4.6,
		img: 'https://images.unsplash.com/photo-1518441902113-c1d3ee4bba32?q=80&w=1200&auto=format&fit=crop',
		description: 'Noise isolation, 30h battery, Bluetooth 5.3.'
	},
	{
		id: 'el-2',
		name: 'Smartphone 6.5" OLED 128GB',
		price: 32999,
		category: 'Phones',
		rating: 4.4,
		img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
		description: 'Dual camera, fast charging, 5G ready.'
	},
	{
		id: 'el-3',
		name: 'Ultrabook 14" i5 8GB/512GB',
		price: 67999,
		category: 'Laptops',
		rating: 4.7,
		img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
		description: 'Lightweight, all‑day battery, backlit keyboard.'
	},
	{
		id: 'el-4',
		name: 'Fitness Smart Watch',
		price: 8999,
		category: 'Wearables',
		rating: 4.3,
		img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1200&auto=format&fit=crop',
		description: 'Heart rate, SpO2, sleep tracking, 7‑day battery.'
	},
	{
		id: 'el-5',
		name: 'USB‑C Fast Charger 30W',
		price: 1999,
		category: 'Accessories',
		rating: 4.5,
		img: 'https://images.unsplash.com/photo-1528531860370-8e89fdf85d1f?q=80&w=1200&auto=format&fit=crop',
		description: 'Compact wall adapter with PD fast charge.'
	},
	{
		id: 'el-6',
		name: 'True Wireless Earbuds',
		price: 4999,
		category: 'Audio',
		rating: 4.2,
		img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
		description: 'Low latency, ENC mic, IPX5 water‑resistant.'
	}
]

function addToCart(item) {
	try {
		const raw = localStorage.getItem(CART_KEY)
		const arr = raw ? JSON.parse(raw) : []
		const idx = arr.findIndex(p => p.id === item.id)
		if (idx >= 0) arr[idx].qty = (arr[idx].qty || 1) + 1
		else arr.push({ ...item, qty: 1 })
		localStorage.setItem(CART_KEY, JSON.stringify(arr))
	} catch {}
}

function addToWishlist(item) {
	try {
		const raw = localStorage.getItem(WISHLIST_KEY)
		const arr = raw ? JSON.parse(raw) : []
		if (!arr.find(p => p.id === item.id)) {
			arr.push({ id: item.id, name: item.name, price: item.price, description: item.description })
			localStorage.setItem(WISHLIST_KEY, JSON.stringify(arr))
		}
	} catch {}
}

export default function Electronics() {
	const [active, setActive] = useState('All')
	const [sortBy, setSortBy] = useState('relevance')
	const [query, setQuery] = useState('')

	const filtered = useMemo(() => {
		let list = [...sampleElectronics]
		if (active !== 'All') list = list.filter(p => p.category === active)
		if (query.trim()) {
			const q = query.trim().toLowerCase()
			list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
		}
		switch (sortBy) {
			case 'price-asc':
				list.sort((a, b) => a.price - b.price)
				break
			case 'price-desc':
				list.sort((a, b) => b.price - a.price)
				break
			case 'rating-desc':
				list.sort((a, b) => b.rating - a.rating)
				break
			default:
				// relevance: keep original (sample order)
				break
		}
		return list
	}, [active, sortBy, query])

	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-gray-900">Electronics</h1>
					<p className="mt-1 text-sm text-gray-600">Phones, audio, laptops, and accessories</p>
				</div>
				<div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
					<div className="flex items-center gap-2">
						{categories.map(c => (
							<button
								key={c}
								onClick={() => setActive(c)}
								className={[
									'rounded-full border px-3 py-1 text-sm transition',
									active === c ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
								].join(' ')}
								type="button"
							>
								{c}
							</button>
						))}
					</div>
					<div className="flex items-center gap-2">
						<input
							value={query}
							onChange={e => setQuery(e.target.value)}
							placeholder="Search electronics..."
							className="w-48 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
						/>
									<select
										value={sortBy}
										onChange={e => setSortBy(e.target.value)}
										className={[
											'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10',
											sortBy === 'relevance' ? 'text-rose-600 dark:text-rose-400' : 'text-gray-700',
										].join(' ')}
									>
							<option value="relevance">Sort: Relevance</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
							<option value="rating-desc">Rating: High to Low</option>
						</select>
					</div>
				</div>
			</div>

			{/* Result count */}
			<div className="mb-3 text-sm text-gray-600">{filtered.length} results</div>

			{/* Grid */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map(p => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>
		</div>
	)
}

function ProductCard({ product }) {
	return (
		<div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
			<div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
				<img
					src={product.img}
					alt={product.name}
					loading="lazy"
					className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
				/>
			</div>
			<div className="p-4">
				<div className="flex items-start justify-between gap-3">
					<div>
						<h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
						<p className="mt-1 text-xs text-gray-500">{product.category} • {product.rating.toFixed(1)}★</p>
					</div>
					<span className="shrink-0 rounded-md bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white">{formatBDT(product.price)}</span>
				</div>
				<p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>
				<div className="mt-4 flex items-center gap-2">
					<button
						onClick={() => addToCart(product)}
						className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90"
					>
						Add to cart
					</button>
					<button
						onClick={() => addToWishlist(product)}
						className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
					>
						Wishlist
					</button>
				</div>
			</div>
		</div>
	)
}

