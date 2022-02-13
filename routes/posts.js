const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

//Create Post

router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    return res.status(200).json(savedPost)
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router
