const express = require('express')
const app = express()
const routers = require('./routers')
const port = parseInt(process.env.PORT, 10) || 5000

app.use(express.json())
app.use('/', routers)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
