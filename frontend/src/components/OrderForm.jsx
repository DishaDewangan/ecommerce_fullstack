import { useState } from 'react'

export default function OrderForm({ onSubmit, initialData = null, onCancel, users = [], products = [] }) {
  const [formData, setFormData] = useState(
    initialData || {
      userId: '',
      // items: { [productId]: quantity }
      items: {},
      shippingAddress: '',
    }
  )
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const handleProductSelect = (productId) => {
    setFormData(prev => {
      const items = { ...prev.items }
      if (items[productId]) {
        delete items[productId]
      } else {
        items[productId] = 1
      }
      return { ...prev, items }
    })
  }

  const handleQuantityChange = (productId, value) => {
    const qty = parseInt(value, 10) || 0
    setFormData(prev => {
      const items = { ...prev.items }
      if (qty <= 0) {
        delete items[productId]
      } else {
        items[productId] = qty
      }
      return { ...prev, items }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!formData.userId) {
      setError('Please select a user')
      setLoading(false)
      return
    }

    const itemsArray = Object.entries(formData.items || {}).map(([productId, quantity]) => ({ productId, quantity }))
    if (itemsArray.length === 0) {
      setError('Please select at least one product with quantity')
      setLoading(false)
      return
    }

    try {
      await onSubmit({
        userId: formData.userId,
        items: itemsArray,
        shippingAddress: formData.shippingAddress,
      })
      if (!initialData) {
        setFormData({
          userId: '',
          items: {},
          shippingAddress: '',
        })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {initialData ? 'Edit Order' : 'Create New Order'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select User *
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          >
            <option value="">-- Choose a user --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Products *
          </label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto">
            {products.length === 0 ? (
              <p className="text-gray-500">No products available. Create products first.</p>
            ) : (
              products.map((product) => {
                const selected = Boolean(formData.items && formData.items[product._id])
                const qty = selected ? formData.items[product._id] : 0
                return (
                  <div key={product._id} className="flex items-center mb-2 justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleProductSelect(product._id)}
                        className="h-4 w-4 text-indigo-600 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {product.name} - ${parseFloat(product.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        disabled={!selected}
                        value={qty}
                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-lg"
                      />
                      <span className="text-xs text-gray-500">in stock: {product.quantity ?? 0}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

<div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Amount
          </label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
            ${
              (Object.entries(formData.items || []).reduce((sum, [pid, q]) => {
                const prod = products.find(p => p._id === pid)
                const price = prod ? parseFloat(prod.price || 0) : 0
                return sum + price * q
              }, 0)).toFixed(2)
            }
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Orders start as Pending automatically. You can review status later in the dashboard.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shipping Address
          </label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            placeholder="Enter shipping address"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Saving...' : initialData ? 'Update Order' : 'Create Order'}
          </button>
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
