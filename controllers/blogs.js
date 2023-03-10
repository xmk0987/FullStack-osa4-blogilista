const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  console.log('tää o tä' + request.token)


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
  const user = request.user
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
