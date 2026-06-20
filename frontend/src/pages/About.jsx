export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
          <p className="text-gray-600 mt-2">Learn more about our ecommerce management platform</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We provide a comprehensive platform for managing ecommerce businesses. Our mission is to 
            simplify the process of managing users, products, and orders, allowing business owners to 
            focus on growing their business rather than managing complex systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">✨ Our Values</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✓</span>
                <span><strong>Simplicity:</strong> Easy-to-use interface for all users</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✓</span>
                <span><strong>Reliability:</strong> Stable and secure platform</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✓</span>
                <span><strong>Innovation:</strong> Continuous improvements and features</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✓</span>
                <span><strong>Support:</strong> Dedicated customer support team</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Why Choose Us?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✓</span>
                <span><strong>All-in-One:</strong> Users, products, and orders in one place</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✓</span>
                <span><strong>User-Friendly:</strong> Intuitive design anyone can use</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✓</span>
                <span><strong>Real-Time:</strong> Instant updates and notifications</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✓</span>
                <span><strong>Scalable:</strong> Grows with your business</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Technology Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Frontend</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• React 18 - Modern UI library</li>
                <li>• Vite - Lightning fast build tool</li>
                <li>• Tailwind CSS - Beautiful styling</li>
                <li>• React Router - Navigation & routing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Backend</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• Node.js - Server runtime</li>
                <li>• Express.js - Web framework</li>
                <li>• MongoDB - NoSQL database</li>
                <li>• REST API - Communication protocol</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg border-2 border-indigo-200 p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">📝</span>
              <div>
                <h4 className="font-semibold text-gray-900">Complete CRUD Operations</h4>
                <p className="text-gray-600 text-sm">Create, read, update, and delete for all entities</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🔒</span>
              <div>
                <h4 className="font-semibold text-gray-900">Data Validation</h4>
                <p className="text-gray-600 text-sm">Comprehensive validation on frontend and backend</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">📱</span>
              <div>
                <h4 className="font-semibold text-gray-900">Responsive Design</h4>
                <p className="text-gray-600 text-sm">Works perfectly on desktop, tablet, and mobile</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">⚡</span>
              <div>
                <h4 className="font-semibold text-gray-900">Real-Time Updates</h4>
                <p className="text-gray-600 text-sm">Instant data refresh and status updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
