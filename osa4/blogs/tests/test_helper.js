const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'some cool blog title',
    author: 'some other author',
    url: 'bing.com',
    likes: 19
  },
  {
    title: 'another cool blog title',
    author: 'another other author',
    url: 'google.com',
    likes: 100
  }
]

const initialUsers = [
  {
    username: 'testuser',
    password: 'password123',
    name: 'test user'
  },
  {
    username: 'anotheruser',
    password: 'password987',
    name: 'another test user'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialUsers,
    initialBlogs,
    blogsInDb
}