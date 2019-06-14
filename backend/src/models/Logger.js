const winston = require('winston')
const path = require('path')
const fs = require('fs')
const logPath = path.join(__dirname, '../../logs')

if (!fs.existsSync(logPath))
  fs.mkdirSync(logPath)

const transportsList = [
  new(winston.transports.Console)({
    level: 'debug',
    colorize: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    timestamp: new Date().toLocaleTimeString(),
    prettyPrint: true
  }),
  new(winston.transports.File)({
    filename: path.join(logPath, path.join(getFormattedDate())),
    level: 'debug',
    colorize: true,
    prettyPrint: true,
    formatter: logFormatter,
    json: false
  })
]


module.exports = new(winston.Logger)({
  transports: process.env.NODE_ENV == 'test' ? [] : transportsList
})

function getFormattedDate() {
  var date = new Date()

  var year = date.getFullYear()

  var month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month

  var day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day

  return month + '-' + day + '-' + year + '.log'
}

// log format config
function logFormatter(options) {
  // Return string will be passed to logger.
  return `[` + new Date().toUTCString() + `] - ` + options.level.toUpperCase() +
    ` - ` + (options.message ? options.message : ``) + (options.meta && Object.keys(options.meta).length ?
      `\n\t` + JSON.stringify(options.meta) : ``)
}

let logColor = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green'
}

winston.addColors(logColor)