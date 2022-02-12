const router = require('express').Router()
const User = require('../models/User')

//Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const newUser = new User({
      username,
      email,
      password,
    })
    const user = await newUser.save()
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
})
//Login

module.exports = router
