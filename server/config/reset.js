import pool from './database.js'
import './dotenv.js'
import eventsData from '../data/events.js'

const createItemsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS items;

    CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
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

    itemsData.forEach((item) => {
        const insertQuery = {
            text: 'INSERT INTO items (eventName, description, image, submittedOn, submittedBy) VALUES ($1, $2, $3, $4, $5)'
        }

        const values = [
            item.title,
            item.description,
            item.image,
            item.submittedOn,
            item.submittedBy
        ]

        pool.query(insertQuery, values, (err,res) => {
            if(err){
                console.error("⚠️ error inserting item", err)
                return;
            }
            console.log(`${item.title} added successfully`)
        })

    })
}

seedItemsTable()
