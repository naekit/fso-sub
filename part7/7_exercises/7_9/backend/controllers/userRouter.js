const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async(req, res) => {
    const { username, name , password } = req.body

    const existingUser = await User.findOne({username})
    if(existingUser){
        return res.status(400).json({
            error: 'username must be unique'
        })
    }
    if(password.length < 3){
        return res.status(400).json({
            error: 'password must be longer than 3 characters'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

userRouter.get('/', async(req,res) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})
    res.json(users)
})

userRouter.get('/:id', async(req,res) => {
    const user = await User.findById(req.params.id).populate('blogs', {title: 1, author: 1, url: 1})

    res.json(user)
})

module.exports = userRouter