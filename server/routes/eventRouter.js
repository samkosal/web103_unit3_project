import express from 'express'
// import controllers for events
import events from '../controllers/events.js'

const router = express.Router()

// define routes to get events
router.get('/', events.getEvents)
router.get('/location/:locationId', events.getEventsByLocationId)
router.get('/:id', events.getEventById)

export default router
