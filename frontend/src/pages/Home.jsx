import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
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

  const formatCurrency = (v) => {
    return `$${Number(v || 0).toFixed(2)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to Ecommerce
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Manage your users, products, and orders efficiently in one place
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/management"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
              >
                Go to Management System
              </Link>
              <Link
                to="/about"
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-8 rounded-lg transition duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '👥',
              title: 'User Management',
              description: 'Manage users with their contact information and addresses'
            },
            {
              icon: '📦',
              title: 'Product Catalog',
              description: 'Create and manage your product inventory with prices and categories'
            },
            {
              icon: '🛒',
              title: 'Order Processing',
              description: 'Track and manage orders with real-time status updates'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white shadow mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {loading ? (
              <div>Loading stats...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              [
                { number: stats ? stats.usersCount : '—', label: 'Users Managed' },
                { number: stats ? stats.productsCount : '—', label: 'Products Listed' },
                { number: stats ? `${stats.ordersCount} orders\n${formatCurrency(stats.totalRevenue)}` : '—', label: 'Orders / Revenue' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl font-bold text-indigo-600 mb-2 whitespace-pre-line">
                    {stat.number}
                  </div>
                  <p className="text-gray-600 text-lg">{stat.label}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Start managing your ecommerce business today
          </p>
          <Link
            to="/management"
            className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-8 rounded-lg transition duration-200 inline-block"
          >
            Access Management System Now
          </Link>
        </div>
      </section>
    </div>
  )
}
