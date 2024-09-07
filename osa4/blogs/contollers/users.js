const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find
    ({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {

  const { username, name, password } = request.body

  if(!password) {
    return response.status(400).json({
        error: 'Password is required!'
    })
  }

  if(password.length < 3) {
    return response.status(400).json({
        error: 'Password needs to be minimun three characters!'
    })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        return response.status(400).json({ error: 'Username must be unique' });
    }
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }
  }
})

module.exports = usersRouter