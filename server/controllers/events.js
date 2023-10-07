import pool from '../config/database.js'

const getEventById = async () => {
    try{

        const selectQuery = `
        SELECT name, eventDate, eventCity, eventDescription, eventLocation, eventTime, submittedBy, submittedOn
        FROM events
        WHERE id=$1 
        `
        const eventId = req.params.eventId
        const results = await pool.query(selectQuery, [eventId])
        res.status(200).json(results.rows[0])


    } catch(err){
        console.log("error from getEventById() in events.js",err)
        res.status(409).json( { error: err.message} )
    }
}

const getAllEvents = async (req,res) => {
        try {
            const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
            res.status(200).json(results.rows)
        } catch (error) {
            res.status(409).json( { error: error.message } )
        }
}

export default{
    getEventById,
    getAllEvents
}