import { pool } from '../config/database.js'

// get all events from the events table
const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// get a single event by its id
const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query('SELECT * FROM events WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// get all events that belong to a given location
const getEventsByLocationId = async (req, res) => {
    try {
        const { locationId } = req.params
        const results = await pool.query('SELECT * FROM events WHERE location = $1 ORDER BY id ASC', [locationId])
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default { getEvents, getEventById, getEventsByLocationId }
