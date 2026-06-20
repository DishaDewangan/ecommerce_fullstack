const { getDB } = require('../config/db')

const getPlatformStats = async () => {
  const db = getDB()
  const usersCount = await db.collection('users').countDocuments()
  const productsCount = await db.collection('products').countDocuments()
  const ordersCount = await db.collection('orders').countDocuments()

  // total revenue: sum of totalAmount across orders (handle missing field)
  const revenueAgg = await db.collection('orders').aggregate([
    { $match: { totalAmount: { $exists: true } } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]).toArray()

  const totalRevenue = (revenueAgg[0] && revenueAgg[0].total) ? revenueAgg[0].total : 0

  return {
    usersCount,
    productsCount,
    ordersCount,
    totalRevenue,
  }
}

module.exports = {
  getPlatformStats,
}
