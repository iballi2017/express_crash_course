
const moment = require('moment') //this is a date package. "npm install moment"


const logger = (req, res, next) => {
    console.log("hello")
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next();
}

module.exports = logger