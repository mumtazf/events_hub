import pool from './database.js'
import './dotenv.js'
import eventsData from '../data/events.js'

const createItemsTable = async () => {
    /**"name": "Tech Innovators Hackathon",
        "eventDate": "2023-10-15",
        "eventCity": "San Francisco",
        "eventDescription": "Join us for a 24-hour hackathon where tech innovators come together to collaborate on exciting projects. Bring your ideas, skills, and passion for innovation!",
        "eventLocation": "Tech Hub SF",
        "eventTime": "09:00",
        "submittedBy": "John Doe",
        "submittedOn": "2023-09-28T12:30:00Z" */
    const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        eventDate VARCHAR(255) NOT NULL,
        eventCity VARCHAR(255) NOT NULL,
        eventDescription TEXT NOT NULL,
        eventLocation TEXT NOT NULL,
        eventTime VARCHAR(255) NOT NULL,
        submittedBy VARCHAR(255) NOT NULL,
        submittedOn TIMESTAMP NOT NULL
    )
`
    try{
        const res = await pool.query(createTableQuery)
    } catch(err){
        console.log('Error creating the gifts table', err);
    }
}

const seedItemsTable = async() => {
    await createItemsTable()

    eventsData.forEach((item) => {
        const insertQuery = {
            text: 'INSERT INTO events (name, eventDate, eventCity, eventDescription, eventLocation,eventTime, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
        }

        const values = [
            item.name,
            item.eventDate,
            item.eventCity,
            item.eventDescription,
            item.eventLocation,
            item.eventTime,
            item.submittedBy,
            item.submittedOn
        ]

        pool.query(insertQuery, values, (err,res) => {
            if(err){
                console.error("⚠️ error inserting item", err)
                return;
            }
            console.log(`${item.name} added successfully`)
        })

    })
}

seedItemsTable()
