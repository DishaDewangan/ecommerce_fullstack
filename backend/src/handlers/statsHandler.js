const { getPlatformStats } = require('../services/statsService')

const getStatsHandler = async (req, res) => {
  try {
    const stats = await getPlatformStats()
    res.status(200).json({ success: true, data: stats })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getStatsHandler,
}
