const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('tää o tä' + request.token)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  console.log('User Id  ' + user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs= user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  console.log('BLOGI ID =  ' + blog.id)
  console.log('Postaajan userid =  ' + blog.user._id)
  console.log('Poistajan userid =  ' + user.id)
  if(blog.user._id.toString() !== user.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  }
  else{
    return response.status(404).send({ error: 'blog can only be deleted by creator' })
  }


})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  await Blog.findByIdAndUpdate(request.params.id, body)
  response.status(200).end()

})



module.exports = blogsRouter
