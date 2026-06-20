import { useState, useEffect } from 'react'
import UserForm from '../components/UserForm'
import UserList from '../components/UserList'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'
import OrderForm from '../components/OrderForm'
import OrderList from '../components/OrderList'
import { userAPI, productAPI, orderAPI } from '../services/api'

export default function Management() {
  // Tab state
  const [activeTab, setActiveTab] = useState('users')

  // Users state
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)

  // Products state
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  // Orders state
  const [orders, setOrders] = useState([])
  const [editingOrder, setEditingOrder] = useState(null)

  // Common state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true)
    setError('')
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        userAPI.getAllUsers(),
        productAPI.getAllProducts(),
        orderAPI.getAllOrders(),
      ])
      setUsers(usersRes.data || [])
      setProducts(productsRes.data || [])
      setOrders(ordersRes.data || [])
    } catch (err) {
      setError('Failed to fetch data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchAllData()
  }, [])

  // ===== USER HANDLERS =====
  const handleUserSubmit = async (formData) => {
    try {
      if (editingUser) {
        await userAPI.updateUser(editingUser._id, formData)
        setSuccess('User updated successfully!')
        setEditingUser(null)
      } else {
        await userAPI.createUser(formData)
        setSuccess('User created successfully!')
      }
      setTimeout(() => setSuccess(''), 3000)
      await fetchAllData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUserEdit = (user) => {
    setEditingUser(user)
    window.scrollTo(0, 0)
  }

  const handleUserDelete = async (userId) => {
    try {
      await userAPI.deleteUser(userId)
      setSuccess('User deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
      await fetchAllData()
    } catch (err) {
      setError(err.message)
    }
  }

  // ===== PRODUCT HANDLERS =====
  const handleProductSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await productAPI.updateProduct(editingProduct._id, formData)
        setSuccess('Product updated successfully!')
        setEditingProduct(null)
      } else {
        await productAPI.createProduct(formData)
        setSuccess('Product created successfully!')
      }
      setTimeout(() => setSuccess(''), 3000)
      await fetchAllData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleProductEdit = (product) => {
    setEditingProduct(product)
    window.scrollTo(0, 0)
  }

  const handleProductDelete = async (productId) => {
    try {
      await productAPI.deleteProduct(productId)
      setSuccess('Product deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
      await fetchAllData()
    } catch (err) {
      setError(err.message)
    }
  }

  // ===== ORDER HANDLERS =====
  const handleOrderSubmit = async (formData) => {
    try {
      if (editingOrder) {
        await orderAPI.updateOrder(editingOrder._id, formData)
        setSuccess('Order updated successfully!')
        setEditingOrder(null)
      } else {
        await orderAPI.createOrder(formData)
        setSuccess('Order created successfully!')
      }
      setTimeout(() => setSuccess(''), 3000)
      await fetchAllData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleOrderEdit = (order) => {
    setEditingOrder(order)
    window.scrollTo(0, 0)
  }

  const handleOrderDelete = async (orderId) => {
    try {
      await orderAPI.deleteOrder(orderId)
      setSuccess('Order deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
      await fetchAllData()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Management System</h1>
              <p className="text-gray-600 mt-1">Manage users, products, and orders</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'users', label: 'Users', icon: '👥', count: users.length },
              { id: 'products', label: 'Products', icon: '📦', count: products.length },
              { id: 'orders', label: 'Orders', icon: '🛒', count: orders.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Alert Messages */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError('')}
              className="text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex justify-between items-center">
            <span>{success}</span>
            <button
              onClick={() => setSuccess('')}
              className="text-green-700 hover:text-green-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <UserForm
              onSubmit={handleUserSubmit}
              initialData={editingUser}
              onCancel={() => setEditingUser(null)}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Users List</h2>
              <UserList
                users={users}
                onEdit={handleUserEdit}
                onDelete={handleUserDelete}
                loading={loading}
              />
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <ProductForm
              onSubmit={handleProductSubmit}
              initialData={editingProduct}
              onCancel={() => setEditingProduct(null)}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Products List</h2>
              <ProductList
                products={products}
                onEdit={handleProductEdit}
                onDelete={handleProductDelete}
                loading={loading}
              />
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <OrderForm
              onSubmit={handleOrderSubmit}
              initialData={editingOrder}
              onCancel={() => setEditingOrder(null)}
              users={users}
              products={products}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders List</h2>
              <OrderList
                orders={orders}
                onEdit={handleOrderEdit}
                onDelete={handleOrderDelete}
                loading={loading}
                users={users}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>Ecommerce Management System © 2024. Built with React + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
