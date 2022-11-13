require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.DB_URI
    : process.env.TEST_DB_URI

module.exports = {
    MONGODB_URI,
    PORT
}