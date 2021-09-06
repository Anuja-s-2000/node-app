const routes = require('express').Router()

module.exports = () => {
    routes.use('/user', require('./user')())
    return routes
}