import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
//import eventsRouter from './routes/events.js'

// import the router from your routes file
import eventsRouter from './routes/events.js'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.use('/events', eventsRouter);
app.use('/api', eventsRouter)

app.get('/',(req,res) => {
    res.status(200).send(`<h1 style = "text-align: center; margin-top: 50px;>Events API</h1>`)
})

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})