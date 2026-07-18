const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const Magazine = require('../models/Magazine')


router.get('/', protect, async (req, res) => {
    try {
        const twelveMonthsAgo = new Date()
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

        const magazines = await Magazine.find({
            publishedDate: { $gte: twelveMonthsAgo }
        }).sort({ publishedDate: -1 })

        res.json(magazines)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router