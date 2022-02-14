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

// Update Post

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        return res.status(200).json(updatedPost)
      } catch (error) {
        return res.status(500).json(error)
      }
    } else {
      return res.status(401).json('You can update only your post')
    }
  } catch (error) {
    return res.status(500).json(error)
  }
})

// Delete Update

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        await post.delete()
        return res.status(200).json('Post has been deleted... ')
      } catch (error) {
        return res.status(500).json(error)
      }
    } else {
      return res.status(401).json('You can delete only your post')
    }
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router
