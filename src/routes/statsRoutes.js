const express = require('express')
const router = express.Router()
const { getStatsHandler } = require('../handlers/statsHandler')

router.get('/', getStatsHandler)

module.exports = router
