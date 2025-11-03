import React, { useMemo, useState } from 'react'
import Electronics from '../components/Electronics'
import Fashion from '../components/Fashion'
import HomeAndLiving from '../components/Home & Living'
import Beauty from '../components/Beauty'
import Products from '../components/Products'
import ProductForm from '../components/ProductForm'
import { formatBDT } from '../utils/formatCurrency'
import { useAuth } from '../context/AuthContext'

const categoryList = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Beauty']

export default function Categories() {
  const { user } = useAuth()
	// Treat 'seller' as admin-equivalent; also support explicit 'admin' role
	const isAdmin = user?.role === 'seller' || user?.role === 'admin'
	const [active, setActive] = useState('All')
	const [showForm, setShowForm] = useState(false)
	const [addedProducts, setAddedProducts] = useState([])

	const headerSubtitle = useMemo(() => {
		switch (active) {
			case 'Electronics':
				return 'Phones, audio, wearables, and more'
			case 'Fashion':
				return 'Clothing, shoes, and accessories'
			case 'Home & Living':
				return 'Furniture, decor, and essentials'
			case 'Beauty':
				return 'Skincare, haircare, and cosmetics'
			default:
				return 'Browse categories and discover curated picks'
		}
	}, [active])

		function handleSave(newItem) {
		// Normalize payload and add a simple id if missing
		const item = {
			id: newItem.id ?? Date.now(),
			name: newItem.name?.trim() || 'Untitled product',
			price: Number.isFinite(newItem.price) ? newItem.price : 0,
			stock: Number.isFinite(newItem.stock) ? newItem.stock : 0,
			description: newItem.description || '',
		}
		setAddedProducts(prev => [item, ...prev])
		setShowForm(false)
	}

	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8">
			{/* Page header */}
			<div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
					<p className="mt-1 text-sm text-gray-600">{headerSubtitle}</p>
				</div>

			</div>

			{/* Category filters (UI only for now) */}
			<div className="mb-6 flex flex-wrap gap-2">
				{categoryList.map(cat => (
					<button
						key={cat}
						onClick={() => setActive(cat)}
						className={[
							'rounded-full border px-3 py-1 text-sm transition',
							active === cat
								? 'border-gray-900 bg-gray-900 text-white'
								: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
						].join(' ')}
						type="button"
					>
						{cat}
					</button>
				))}
			</div>

					{/* Main content area: render based on selected category */}
							<section aria-labelledby="catalog">
						<h2 id="catalog" className="sr-only">Catalog</h2>
												{active === 'Electronics' ? (
													<Electronics />
												) : active === 'Fashion' ? (
													<Fashion />
												) : active === 'Home & Living' ? (
													<HomeAndLiving />
												) : active === 'Beauty' ? (
													<Beauty />
												) : (
									<div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
										<Products />
									</div>
								)}
					</section>

			{/* Recently added via form */}
			{addedProducts.length > 0 && (
				<section className="mt-8" aria-labelledby="recently-added">
					<h2 id="recently-added" className="mb-3 text-lg font-semibold text-gray-900">Recently added</h2>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{addedProducts.map(p => (
							<div key={p.id} className="rounded border border-gray-200 bg-white p-4 shadow-sm">
								<div className="h-36 rounded bg-gray-50 text-gray-400 flex items-center justify-center">Image</div>
								<div className="mt-3">
									<div className="font-medium">{p.name}</div>
									<div className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description || '—'}</div>
								</div>
								<div className="mt-3 flex items-center justify-between">
									<div className="text-lg font-semibold">{formatBDT(p.price)}</div>
									<div className="text-xs text-gray-500">Stock: {p.stock}</div>
								</div>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Removed Categories-level modal to keep single admin add point in Beauty */}
		</div>
	)
}

