import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('http://localhost:5000/stats')
        if (!res.ok) throw new Error('Failed to load stats')
        const json = await res.json()
        setStats(json.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`

  const dashboardItems = [
    {
      icon: '👥',
      title: 'Users',
      description: 'Manage user profiles and information',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: '📦',
      title: 'Products',
      description: 'Manage product catalog',
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: '🛒',
      title: 'Orders',
      description: 'Track and manage orders',
      color: 'bg-purple-100 text-purple-700',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Management Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your business operations efficiently</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dashboardItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer p-8 text-center"
            >
              <div className={`text-5xl mb-4 mx-auto w-16 h-16 rounded-full flex items-center justify-center ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button
                onClick={() => navigate('/management')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Manage {item.title}
              </button>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Loading stats...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Users', value: stats ? stats.usersCount : '—', color: 'bg-blue-50 text-blue-700' },
                { label: 'Total Products', value: stats ? stats.productsCount : '—', color: 'bg-green-50 text-green-700' },
                { label: 'Total Orders', value: stats ? stats.ordersCount : '—', color: 'bg-purple-50 text-purple-700' },
                { label: 'Revenue', value: stats ? formatCurrency(stats.totalRevenue) : '—', color: 'bg-yellow-50 text-yellow-700' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-lg ${stat.color}`}
                >
                  <p className="text-sm font-medium opacity-75">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Management System */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Management System</h2>
          <p className="text-gray-600 mb-6">
            Welcome to the Ecommerce Management System. Below you can manage all aspects of your business:
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">👥 User Management</h3>
              <p className="text-gray-600 text-sm">Create, update, and manage customer profiles including contact information</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">📦 Product Management</h3>
              <p className="text-gray-600 text-sm">Add, edit, and remove products from your catalog with pricing and categories</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">🛒 Order Management</h3>
              <p className="text-gray-600 text-sm">Track orders, update status, and manage shipping information</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/management')}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Go to Management System
          </button>
        </div>
      </main>
    </div>
  )
}
