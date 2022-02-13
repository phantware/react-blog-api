const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')

//Update
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      return res.status(200).json(updatedUser)
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(401).json('You can only update your account')
  }
})

//Delet User

router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      try {
        await Post.deleteMany({ username: user.username })
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json('User has been deleted successfully')
      } catch (error) {
        console.log(error)
        return res.status(500).json(error)
      }
    } catch (error) {
      return res.status(404).json('User not found')
    }
  } else {
    return res.status(401).json('You can only delete your account')
  }
})

//Get single user

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    return res.status(200).json(others)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})
module.exports = router
