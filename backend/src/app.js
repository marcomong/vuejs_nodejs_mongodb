const express = require('express')
const log = require('./models/Logger')
const config = require('./configuration/config')
const database = require('./configuration/database') // it iinstanciate the signleton to the mongodb connection
const bodyParser = require('body-parser')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')
const generalRoutes = require('./routes/generalRoutes')
const authRoutes = require('./routes/authRoutes')

let app = express()
app.use(cors())

app.set('port', config.app.port)
require('./configuration/passport')
app.use(bodyParser.json({
  limit: '10mb'
}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}))
app.use('/user', userRoutes)
app.use('/general', generalRoutes)
app.use('/auth', authRoutes)

app.use((req, res, next) => {
  res.status(404).send({
    error: 'End point not valid. Check your address'
  })
})

app.listen(app.get('port'), function () {
  log.info(`server started on port: ${app.get('port')}`)
})

module.exports = app