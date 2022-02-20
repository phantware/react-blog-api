const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'you are welcome to auth page' })
})

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
    return res.status(200).json({ user, status: true })
  } catch (error) {
    return res.json({ error, status: false, message: error.message })
  }
})
//Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.status(400).json('Wrong Credentials')
    }
    const validate = await bcrypt.compare(req.body.password, user.password)
    if (!validate) {
      return res.status(400).json('Wrong Credentials')
    }
    const { password, ...others } = user._doc
    return res.status(200).json(others)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

module.exports = router
