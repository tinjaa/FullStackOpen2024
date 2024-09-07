const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

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

test('returns expeced amout of blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('returned blogs should have id field', async () => {
  const response = await api.get('/api/blogs')

  response.body.map(blog => 
    assert.ok(blog.hasOwnProperty('id'))
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(titles.includes('test title'))
})

test('default value for likes should be set as 0', async() => {
  const newBlog = {
    title: 'test without likes',
    author: 'test author',
    url: 'test.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogWithoutLikes = response.body.find(blog => blog.title === 'test without likes')

  assert.strictEqual(blogWithoutLikes.likes,0)
})

test('return 400 Bad Request if title or url is missing', async() => {
  const newBlog = {
    title: 'test without url',
    author: 'test author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsBeforeDelete = await helper.blogsInDb()
  const blogToDelete = blogsBeforeDelete[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfterDelete = await helper.blogsInDb()

  const titles = blogsAfterDelete.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAfterDelete.length, helper.initialBlogs.length -1)
})

test('a blog can be modified', async () => {
  const blogs = await helper.blogsInDb()
  const initialBlog = blogs[0]

  const updatedBlogData = {
    title: initialBlog.title,
    author: initialBlog.author,
    url: initialBlog.url,
    likes: 1000
  } 

  const response = await api
    .put(`/api/blogs/${initialBlog.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(initialBlog.title, response.body.title)
    assert.notStrictEqual(initialBlog.likes, response.body.likes)

})

after(async () => {
  await mongoose.connection.close()
})