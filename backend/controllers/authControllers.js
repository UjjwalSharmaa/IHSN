const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        
        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        
        if (new Date() > new Date(user.subscriptionExpiry)) {
            return res.status(401).json({ message: 'Your subscription has expired. Please contact admin.' })
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            subscriptionExpiry: user.subscriptionExpiry,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const getUserProfile = async (req, res) => {
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        subscriptionExpiry: req.user.subscriptionExpiry,
    })
}

module.exports = { loginUser, getUserProfile }