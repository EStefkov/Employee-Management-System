const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')
const { route } = require('./employee')

router.post('/register',AuthController.registar)
router.post('/login',AuthController.login)
router.post('/homePage',)

module.exports = router