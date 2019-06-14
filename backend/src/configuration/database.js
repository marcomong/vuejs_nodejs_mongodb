const mongoose = require('mongoose');
const log = require('../models/Logger')
const config = require('./config')

mongoose.set('useCreateIndex', true);

class Database {
  constructor() {
    this._connect()
  }
  _connect() {
    let link = `mongodb://${config.app.db.server}/${config.app.db.name}`
    mongoose.connect(link, {
        useNewUrlParser: true
      })
      .then(() => {
        log.info('Database connection successful')
      })
      .catch(err => {
        log.error('Database connection error')
      })
  }
}
module.exports = new Database()