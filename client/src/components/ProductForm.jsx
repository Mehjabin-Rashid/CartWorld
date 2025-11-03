import React, { useState, useEffect } from 'react'

const ProductForm = ({ initialData = null, onSave, onCancel }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  // Image handling
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [previewError, setPreviewError] = useState('')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setPrice(initialData.price != null ? String(initialData.price) : '')
      setStock(initialData.stock != null ? String(initialData.stock) : '')
      setDescription(initialData.description || '')
      // prefill image if present
      const img = initialData.img || ''
      setImageUrl(typeof img === 'string' ? img : '')
      setImageFile(null)
      setPreviewUrl(typeof img === 'string' ? img : '')
      setPreviewError('')
    } else {
      setName('')
      setPrice('')
      setStock('')
      setDescription('')
      setImageUrl('')
      setImageFile(null)
      setPreviewUrl('')
      setPreviewError('')
    }
  }, [initialData])

  // Cleanup object URL when component unmounts or when replacing file
  useEffect(() => {
    return () => {
      if (previewUrl && imageFile && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl, imageFile])

  function handleImageFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    // Revoke previous blob URL if any
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl)
    }
    setImageFile(file)
    const blobUrl = URL.createObjectURL(file)
    setPreviewUrl(blobUrl)
    setPreviewError('')
  }

  function handleImageUrlChange(val) {
    setImageUrl(val)
    // if user types a URL, prefer that over file
    setImageFile(null)
    setPreviewUrl(val)
    setPreviewError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const parsedPrice = parseFloat(price) || 0
    const parsedStock = parseInt(stock, 10) || 0

    const payload = {
      id: initialData?.id,
      name: name.trim(),
      price: parsedPrice,
      stock: parsedStock,
      description: description.trim(),
      // Prefer uploaded file preview URL; otherwise use typed image URL
      img: imageFile ? previewUrl : imageUrl.trim(),
    }

    onSave(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Price (Tk)</label>
          <input
            value={price}
            onChange={e => setPrice(e.target.value)}
            type="number"
            step="0.01"
            className="mt-1 block w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Stock</label>
          <input
            value={stock}
            onChange={e => setStock(e.target.value)}
            type="number"
            className="mt-1 block w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Description</label>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Image URL</label>
          <input
            value={imageUrl}
            onChange={e => handleImageUrlChange(e.target.value)}
            type="url"
            placeholder="https://..."
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Or Upload Image</label>
          <input
            onChange={handleImageFile}
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm"
          />
        </div>
      </div>

      {/* Preview */}
      {(previewUrl && !previewError) ? (
        <div className="mt-3">
          <div className="text-sm text-gray-600 mb-1">Preview</div>
          <img
            src={previewUrl}
            alt="preview"
            onError={() => setPreviewError('Failed to load image')}
            className="h-32 w-32 object-cover rounded border"
          />
        </div>
      ) : previewError ? (
        <div className="mt-3 text-sm text-red-600">{previewError}</div>
      ) : null}

      <div className="mt-3 flex gap-2">
        <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
          Save
        </button>

        <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProductForm
