const { Router } = require('express')
const router = Router()

const Messages = require('../dao/models/messages.models')

router.get('/chat', async (req, res) => {
    try {
        const chats = await Messages.find().lean()
        res.render('chat.handlebars', {
            chats,
            title: 'Chat',
            style: 'style.css'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Error in request' })
    }
})

router.post('/chat', async (req, res) => {
    const { user, message } = req.body
    const msj = {
        user,
        message
    }
    const newMsj = await Messages.create(msj)
    res.json(newMsj)
})

module.exports = router