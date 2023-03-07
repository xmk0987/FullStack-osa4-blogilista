/* eslint-disable */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
jest.setTimeout(10000)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


test('there are right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    console.log(response)
    console.log("response body" + response.body.length)

    const blogsTotal = await helper.blogsInDb()

    console.log("tää on tää " + blogsTotal.length)

    expect(response.body).toHaveLength(blogsTotal.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})


test('identification is id', async () => {
    const response = await api.get('/api/blogs')

    console.log(response.body[0])

    console.log(response.body.length)
    for(var i = 0; i < response.body.length; i++ ){
        console.log(response.body[i].id)
        expect(response.body[i].id).toBeDefined()
    }
    
})


test('blogs are posted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    
    const newBlog = {
      title: 'Testi Blogi',
      author: 'Onni',
      url: 'https://testi.com/',
      likes: 90
    }

    await api.post('/api/blogs')
    .send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    console.log("TÄÄ ON TÄÄ " +blogsAtStart.length)
    console.log("SIT ON TÄÄÄ TÄSÄÄ " + blogsAtEnd.length)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    

 
})


test('a null value given to likes', async () => {
  const newBlog = {
    title: 'Testi Blogi',
    author: 'Onni',
    url: 'https://testi.com/'
  }

  await api.post('/api/blogs')
  .send(newBlog).expect(201).expect('Content-Type', /application\/json/)


  const response = await api.get('/api/blogs')
  console.log(response.body)
  
  const newBlogLikes = response.body.find(x => x.title === 'Testi Blogi').likes

  console.log(newBlogLikes)


  expect(newBlogLikes).toBe(0)

  })

test('check that post doesnt happen without title or url', async () => {
  const newBlog = {
    title: 'Testi Blogi',
    author: 'Onni'
  }

  await api.post('/api/blogs')
  .send(newBlog).expect(400)


  })


test('delete working', async () => {
  const blogsAtStart = await helper.blogsInDb()
  console.log(blogsAtStart)
  const blogToDelete = blogsAtStart[0]
  console.log(blogToDelete)

  await api
  .delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  console.log(blogsAtEnd)
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)

})


test('check updated blog', async () => {
  
  const blogsAtStart = await helper.blogsInDb()
  console.log(blogsAtStart)
  const blogToUpdate = blogsAtStart[0]
  console.log(blogToUpdate.id)

  await api
  .put(`/api/blogs/${blogToUpdate.id}`)
  .send({likes: 100})

  console.log("testi")
  const blogsAtEnd = await helper.blogsInDb()
  console.log(blogsAtEnd)
  const updatedBlog = blogsAtEnd[0]

  expect(updatedBlog.likes).toBe(100)
  expect(200)





})

