const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req,res,next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('----', req)
    next()
}

const unknownEndpoint = (req,res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (err,req,res,next) => {
    logger.error(err.message)

    if(err.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'})
    } else if(err.name === 'ValidationError'){
        return res.status(400).json({error: err.message})
    }

    next(err)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        req.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (req, res, next) => {
    if(!req.token){
        req.user = null
    } else {
        const decode = jwt.verify(req.token, process.env.SECRET)
        !decode.id 
            ? req.user = null
            : req.user = await User.findById(decode.id)
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}