const express = require('express')
const routers = require('./routers/index')
const cors = require('cors')
const cookieSession = require('cookie-session')
const db = require('./models/init')
const db_con = require('./config/db.config')

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

const Role = db.role

db.mongoose
    .connect(`mongodb://${db_con.HOST}:${db_con.PORT}/${db_con.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Successfully connect to MongoDB.')
        initial()
    })
    .catch((err) => {
        console.error('Connection error', err)
        process.exit()
    })

    async function initial() {
        try {
            const count = await Role.estimatedDocumentCount();
            
            if (count === 0) {
                await new Role({
                    name: 'user',
                }).save();
    
                await new Role({
                    name: 'moderator',
                }).save();
    
                await new Role({
                    name: 'admin',
                }).save();
    
                console.log("Roles added to the roles collection");
            } else {
                console.log("Roles already exist in the roles collection");
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }
    

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
