const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })
    const user = await newUser.save()
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
})
//Login

module.exports = router
