import pool from './database.js'
import './dotenv.js'
import eventsData from '../data/events.js'

const createItemsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS items;

    CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        eventCity VARCHAR(255) NOT NULL,
        eventDescription TEXT NOT NULL,
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
            text: 'INSERT INTO items (name, eventDate, eventCity, eventDescription, eventLocation,eventTime, submittedBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
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
