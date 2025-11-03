import React, { useMemo, useState } from 'react'
import { formatBDT } from '../utils/formatCurrency'

const CART_KEY = 'cw_cart'
const WISHLIST_KEY = 'cw_wishlist'

const subcategories = ['All', 'Skincare', 'Haircare', 'Makeup', 'Fragrance', 'Tools']

const sampleBeauty = [
	{
		id: 'be-1',
		name: 'Hydrating Face Serum 30ml',
		price: 1599,
		sub: 'Skincare',
		rating: 4.6,
		img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop',
		description: 'Hyaluronic acid boost, lightweight, daily glow.'
	},
	{
		id: 'be-2',
		name: 'Nourishing Shampoo 300ml',
		price: 899,
		sub: 'Haircare',
		rating: 4.3,
		img: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop',
		description: 'Sulfate‑free formula, strengthens and smooths.'
	},
	{
		id: 'be-3',
		name: 'Matte Lipstick',
		price: 699,
		sub: 'Makeup',
		rating: 4.4,
		img: 'https://images.unsplash.com/photo-1585238342020-96629f3c0c54?q=80&w=1200&auto=format&fit=crop',
		description: 'Rich pigment, long‑lasting, velvety finish.'
	},
	{
		id: 'be-4',
		name: 'Eau de Parfum 50ml',
		price: 2599,
		sub: 'Fragrance',
		rating: 4.5,
		img: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop',
		description: 'Citrus top notes with warm woody base.'
	},
	{
		id: 'be-5',
		name: 'Facial Cleansing Brush',
		price: 1299,
		sub: 'Tools',
		rating: 4.2,
		img: 'https://images.unsplash.com/photo-1613151835701-896a28f20b48?q=80&w=1200&auto=format&fit=crop',
		description: 'Gentle silicone bristles, waterproof design.'
	},
	{
		id: 'be-6',
		name: 'Moisturizing Body Lotion 250ml',
		price: 999,
		sub: 'Skincare',
		rating: 4.1,
		img: 'https://images.unsplash.com/photo-1614233713534-0ec0239b7e33?q=80&w=1200&auto=format&fit=crop',
		description: 'Fast‑absorbing, non‑greasy, all‑day hydration.'
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

export default function Beauty() {
	const [active, setActive] = useState('All')
	const [sortBy, setSortBy] = useState('relevance')
	const [query, setQuery] = useState('')

	const filtered = useMemo(() => {
		let list = [...sampleBeauty]
		if (active !== 'All') list = list.filter(p => p.sub === active)
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
				break
		}
		return list
	}, [active, sortBy, query])

	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-gray-900">Beauty</h1>
					<p className="mt-1 text-sm text-gray-600">Skincare, haircare, makeup, and more</p>
				</div>
				<div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
					<div className="flex flex-wrap items-center gap-2">
						{subcategories.map(c => (
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
							placeholder="Search beauty..."
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
					<Card key={p.id} item={p} />
				))}
			</div>
		</div>
	)
}

function Card({ item }) {
	return (
		<div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
			<div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
				<img
					src={item.img}
					alt={item.name}
					loading="lazy"
					className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
				/>
			</div>
			<div className="p-4">
				<div className="flex items-start justify-between gap-3">
					<div>
						<h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
						<p className="mt-1 text-xs text-gray-500">{item.sub} • {item.rating.toFixed(1)}★</p>
					</div>
					<span className="shrink-0 rounded-md bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white">{formatBDT(item.price)}</span>
				</div>
				<p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.description}</p>
				<div className="mt-4 flex items-center gap-2">
					<button
						onClick={() => addToCart(item)}
						className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90"
					>
						Add to cart
					</button>
					<button
						onClick={() => addToWishlist(item)}
						className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
					>
						Wishlist
					</button>
				</div>
			</div>
		</div>
	)
}

