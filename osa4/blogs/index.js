const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./contollers/blogs')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

app.use('/api/blogs', blogsRouter)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

const PORT = config.PORT
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})