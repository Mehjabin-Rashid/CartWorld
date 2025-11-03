import React, { useState } from 'react'
import { formatBDT } from '../utils/formatCurrency'

const sampleProducts = [
  { id: 1, name: 'Handmade Ceramic Mug', price: 450.0, stock: 24, description: '400ml ceramic mug, dishwasher safe.' },
  { id: 2, name: 'Organic Jute Bag', price: 350.0, stock: 12, description: 'Strong and eco-friendly shopping bag.' },
  { id: 3, name: 'Bamboo Toothbrush (Pack of 3)', price: 120.0, stock: 40, description: 'Sustainable toothbrushes with soft bristles.' },
  { id: 4, name: 'Local Tea (250g)', price: 220.0, stock: 30, description: 'Fragrant black tea from Bangladesh.' },
]

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
  >
    {children}
  </button>
)

const UserDashboard = () => {
  const [tab, setTab] = useState('browse')
  const [products] = useState(sampleProducts)
  const [cart, setCart] = useState([]) // { id, productId, qty }
  const [orders, setOrders] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [reviews, setReviews] = useState([]) // { id, productId, rating, comment }

  function addToCart(product) {
    setCart(c => {
      const existing = c.find(i => i.productId === product.id)
      if (existing) return c.map(i => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i))
      return [...c, { id: Date.now(), productId: product.id, qty: 1 }]
    })
  }

  function updateQty(itemId, qty) {
    if (qty <= 0) return removeFromCart(itemId)
    setCart(c => c.map(i => (i.id === itemId ? { ...i, qty } : i)))
  }

  function removeFromCart(itemId) {
    setCart(c => c.filter(i => i.id !== itemId))
  }

  function placeOrder() {
    if (!cart.length) return alert('Cart is empty')
    const orderTotal = cart.reduce((sum, it) => {
      const p = products.find(x => x.id === it.productId)
      return sum + (p ? p.price * it.qty : 0)
    }, 0)

    const newOrder = {
      id: Date.now(),
      items: cart.map(i => ({ productId: i.productId, qty: i.qty })),
      total: orderTotal,
      date: new Date().toISOString(),
      status: 'Placed',
    }

    setOrders(o => [newOrder, ...o])
    setCart([])
    setTab('orders')
  }

  function cartDetails() {
    return cart.map(i => {
      const p = products.find(x => x.id === i.productId) || {}
      return { ...i, product: p }
    })
  }

  const subtotal = cartDetails().reduce((s, it) => s + (it.product.price || 0) * it.qty, 0)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Your Dashboard</h2>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow"
          >
            Menu
            <span className="text-gray-500">▾</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow z-10">
              {[
                { key: 'browse', label: `Browse` },
                { key: 'cart', label: `Cart (${cart.length})` },
                { key: 'orders', label: `Orders (${orders.length})` },
                { key: 'reviews', label: 'Product Reviews' },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => {
                    setTab(item.key)
                    setMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white ${
                    tab === item.key ? 'font-semibold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {tab === 'browse' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white dark:bg-gray-800 shadow rounded p-4 flex flex-col">
              <div className="h-36 bg-gray-100 dark:bg-gray-700 rounded mb-3 flex items-center justify-center text-gray-400">Image</div>
              <div className="flex-1">
                <div className="font-medium text-lg">{p.name}</div>
                <div className="text-sm text-black mt-1">{p.description}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-lg font-semibold">{formatBDT(p.price)}</div>
                <button onClick={() => addToCart(p)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'cart' && (
        <div>
          <div className="bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow rounded p-4 mb-4">
            <h3 className="text-lg font-medium">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-sm text-black mt-2">Your cart is empty. Browse products to add items.</p>
            ) : (
              <div className="mt-3">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-4 py-2">Product</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Qty</th>
                      <th className="px-4 py-2">Total</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails().map(it => (
                      <tr key={it.id} className="border-t">
                        <td className="px-4 py-2 align-top">{it.product.name}</td>
                        <td className="px-4 py-2 align-top">{formatBDT(it.product.price)}</td>
                        <td className="px-4 py-2 align-top">
                          <input type="number" min="1" value={it.qty} onChange={e => updateQty(it.id, Number(e.target.value))} className="w-20 px-2 py-1 border rounded" />
                        </td>
                        <td className="px-4 py-2 align-top">{formatBDT((it.product.price || 0) * it.qty)}</td>
                        <td className="px-4 py-2 align-top">
                          <button onClick={() => removeFromCart(it.id)} className="px-2 py-1 bg-red-600 text-white rounded text-sm">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-lg">Subtotal: <span className="font-semibold">{formatBDT(subtotal)}</span></div>
                  <div>
                    <button onClick={placeOrder} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Place Order</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow rounded p-4">
          <h3 className="text-lg font-medium mb-2">Your Orders</h3>
          {orders.length === 0 ? (
            <p className="text-sm text-black">You have no orders yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.map(o => (
                <div key={o.id} className="border rounded p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Order #{o.id}</div>
                    <div className="text-sm text-gray-500">{new Date(o.date).toLocaleString()}</div>
                  </div>
                  <div className="mt-2">
                    {o.items.map(it => {
                      const p = products.find(x => x.id === it.productId) || { name: 'Unknown' }
                      return (
                        <div key={it.productId} className="flex items-center justify-between text-sm">
                          <div>{p.name} x {it.qty}</div>
                          <div>{formatBDT((p.price || 0) * it.qty)}</div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-2 text-right font-semibold">Total: {formatBDT(o.total)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'reviews' && (
        <div className="bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow rounded p-4">
          <h3 className="text-lg font-medium mb-3">Product Reviews</h3>
          <ReviewForm products={products} onAdd={r => setReviews(rs => [r, ...rs])} />
          <div className="mt-4 space-y-3">
            {reviews.length === 0 ? (
              <p className="text-sm text-black">No reviews yet. Be the first to review a product.</p>
            ) : (
              reviews.map(r => {
                const p = products.find(x => x.id === r.productId)
                return (
                  <div key={r.id} className="border rounded p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{p?.name || 'Unknown Product'}</div>
                      <div className="text-sm text-yellow-600">Rating: {r.rating}/5</div>
                    </div>
                    <div className="mt-1 text-sm text-gray-700">{r.comment}</div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

    </div>
  )
}

function ReviewForm({ products, onAdd }) {
  const [productId, setProductId] = useState(products[0]?.id || '')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!productId) return
    const r = { id: Date.now(), productId: Number(productId), rating: Number(rating), comment: comment.trim() }
    onAdd(r)
    setComment('')
    setRating(5)
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
      <select value={productId} onChange={e => setProductId(e.target.value)} className="border rounded px-2 py-1">
        {products.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <select value={rating} onChange={e => setRating(e.target.value)} className="border rounded px-2 py-1">
        {[1,2,3,4,5].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a short review" className="border rounded px-2 py-1" />
      <button className="bg-blue-600 text-white rounded px-3 py-1">Add Review</button>
    </form>
  )
}

export default UserDashboard
