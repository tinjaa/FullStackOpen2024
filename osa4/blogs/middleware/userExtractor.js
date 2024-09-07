const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' });
  }

  const user = await User.findById(decodedToken.id)
  
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  request.user = user

  next()
}

module.exports = userExtractor