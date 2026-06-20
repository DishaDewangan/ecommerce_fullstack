export default function ProductList({ products, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin">
          <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No products yet</h3>
        <p className="mt-2 text-gray-600">Add your first product to get started</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-semibold">${parseFloat(product.price).toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.quantity || 0}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.category || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.description ? product.description.substring(0, 30) + '...' : '-'}
                </td>
                <td className="px-6 py-4 text-sm space-x-2 flex">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1 px-3 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this product?')) {
                        onDelete(product._id)
                      }
                    }}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-1 px-3 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
