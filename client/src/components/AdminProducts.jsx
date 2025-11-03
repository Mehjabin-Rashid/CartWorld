import React, { useState } from 'react'
import ProductForm from './ProductForm'
import { formatBDT } from '../utils/formatCurrency'

const initialProducts = [
  { id: 1, name: 'Sample Product A', price: 29.99, stock: 12, description: 'Nice product A' },
  { id: 2, name: 'Sample Product B', price: 49.99, stock: 5, description: 'Nice product B' },
]

const AdminProducts = () => {
  const [products, setProducts] = useState(initialProducts)
  const [editing, setEditing] = useState(null)
  const [isCreating, setIsCreating] = useState(false)

  function handleCreate() {
    setEditing(null)
    setIsCreating(true)
  }

  function handleSave(product) {
    if (product.id) {
      // update
      setProducts(p => p.map(x => (x.id === product.id ? product : x)))
    } else {
      // create - assign simple id
      const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1
      setProducts(p => [...p, { ...product, id }])
    }

    setIsCreating(false)
    setEditing(null)
  }

  function handleEdit(prod) {
    setEditing(prod)
    setIsCreating(false)
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return
    setProducts(p => p.filter(x => x.id !== id))
  }

  return (
    <div className="mt-6 rounded-xl p-4 bg-gradient-to-r from-violet-400 via-white to-lime-300 text-gray-900 shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Manage Products</h3>
        <div>
          <button
            onClick={handleCreate}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            + Create Product
          </button>
        </div>
      </div>

      {(isCreating || editing) && (
        <div className="mb-4">
          <ProductForm
            initialData={editing}
            onSave={handleSave}
            onCancel={() => {
              setEditing(null)
              setIsCreating(false)
            }}
          />
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow rounded overflow-x-auto">
        {/* Helper inside file so formatting is consistent */}
        
        <table className="min-w-full text-left">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2 align-top">{p.id}</td>
                <td className="px-4 py-2 align-top">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.description}</div>
                </td>
                <td className="px-4 py-2 align-top">{formatBDT(p.price)}</td>
                <td className="px-4 py-2 align-top">{p.stock}</td>
                <td className="px-4 py-2 align-top">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProducts
