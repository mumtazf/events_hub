import EventsController from '../controllers/events.js'

import express from 'express'
import path from 'path'

import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(__dirname)

const router = express.Router()

router.get('/events', EventsController.getAllEvents)
router.get('/', EventsController.getAllEvents)

router.get('/events/:eventsId', (req,res) => {
    console.log("hi from items 2 server")

    res.status(200).sendFile(path.resolve(__dirname, '../public/event.html'))
})


export default router
