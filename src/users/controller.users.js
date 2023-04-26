
const { Router } = require('express')
const Users = require('../dao/models/users.models')

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body
    const newUserInfo = {
      first_name,
      last_name,
      email,
      age,
      password,
    }

    const existingUser = await Users.findOne({email})
    if (existingUser) return res.status(400).json({status: 'error', error: 'bad request'})

    const user = await Users.create(newUserInfo)
    res.status(201).json({ status: 'success', message: user })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ status: 'error', error: 'Internal server error' })
  }
})

module.exports = router