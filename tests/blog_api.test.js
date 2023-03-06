/* eslint-disable */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

let initialBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title:'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }]



beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    })


test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
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
    console.log(initialBlogs.length)
    const newBlog = {
      title: 'Testi Blogi',
      author: 'Onni',
      url: 'https://testi.com/',
      likes: 90
    }

    await api.post('/api/blogs')
    .send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    console.log(response.body.length)

 
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