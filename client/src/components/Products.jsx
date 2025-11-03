import React, { useState } from 'react'
import { formatBDT } from '../utils/formatCurrency'

const sampleProducts = [
  {
    id: 1,
    name: 'Handmade Ceramic Mug',
    price: 450.0,
    stock: 24,
    description: '400ml ceramic mug, dishwasher safe.',
    img: '/public/img/mug.jpeg',
  },
  {
    id: 2,
    name: 'Organic Jute Bag',
    price: 350.0,
    stock: 12,
    description: 'Strong and eco-friendly shopping bag.',
    img: '/public/img/bag.jpeg',
  },
  {
    id: 3,
    name: 'Bamboo Toothbrush (Pack of 3)',
    price: 120.0,
    stock: 40,
    description: 'Sustainable toothbrushes with soft bristles.',
    img: '/public/img/bamboo.webp',
  },
  {
    id: 4,
    name: 'Local Tea (250g)',
    price: 220.0,
    stock: 30,
    description: 'Fragrant black tea from Bangladesh.',
    img: '/public/img/tea.jpeg',
  },
]

const Products = () => {
  const [cartCount, setCartCount] = useState(0)
  const [products] = useState(sampleProducts)

  function addToCart(product) {
    setCartCount(c => c + 1)
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-violet-400 via-white to-lime-300 text-black">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="text-lg">🛒 Cart: <span className="font-semibold">{cartCount}</span></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => {
          const fallback = `https://dummyimage.com/640x480/eeeeee/555555&text=${encodeURIComponent(p.name)}`
          const src = p.img || fallback
          return (
          <div
            key={p.id}
            className="shadow-md rounded-2xl p-4 flex flex-col"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 rounded-lg mb-3">
              <img
                src={src}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
                }}
              />
            </div>

            <div className="flex-1">
              <div className="font-semibold text-lg text-gray-900">{p.name}</div>
              <div className="text-sm text-gray-700 mt-1">{p.description}</div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-900">{formatBDT(p.price)}</div>
              <button
                onClick={() => addToCart(p)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition"
              >
                Add to cart
              </button>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products
