const express = require('express')
const routers = require('./routers/index')
const cors = require('cors')
const cookieSession = require('cookie-session')

const port = parseInt(process.env.PORT, 10) || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieSession({
    name: 'session',
    keys: ['COOKIE_SECRET'],
    httpOnly: true,
}))

app.use('/', routers)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
