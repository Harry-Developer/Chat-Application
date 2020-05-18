const express = require('express')
const router =  express.Router()
const userController = require('../controllers/user.js')

router.post(
    '/login',
    userController.login
)

router.post(
    '/register',
    userController.register
)

router.get(
    '/chat',
    userController.getChat
)

module.exports =  router