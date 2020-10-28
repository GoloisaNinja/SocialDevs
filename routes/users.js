const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/User')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const avatar = await user.getAvatar()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }
    
})

router.post('/users/login', async (req, res) => {
    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        await user.save()
        res.send({ user, token })
        console.log('user logged in')
    } catch(e) {
        res.status(400).send(e)
    }
    
})

router.post('/users/logout', auth, async (req, res) => {
    console.log(req.header)
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('User logged out')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('All User instances logged out')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router