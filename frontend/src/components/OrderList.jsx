export default function OrderList({ orders, onEdit, onDelete, loading, users = [] }) {
  const getUserName = (userId) => {
    const user = users.find(u => u._id === userId)
    return user ? user.name : 'Unknown User'
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin">
          <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
        <p className="mt-2 text-gray-600">Create your first order to get started</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Products</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{getUserName(order.userId)}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">${parseFloat(order.totalAmount).toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.items ? order.items.length : 0} items</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.shippingAddress ? order.shippingAddress.substring(0, 30) + '...' : '-'}
                </td>
                <td className="px-6 py-4 text-sm space-x-2 flex">
                  <button
                    onClick={() => onEdit(order)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1 px-3 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this order?')) {
                        onDelete(order._id)
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
