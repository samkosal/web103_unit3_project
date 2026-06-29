import express from 'express'
// import controllers for locations
import locations from '../controllers/locations.js'

const router = express.Router()

// define routes to get locations
router.get('/', locations.getLocations)
router.get('/:id', locations.getLocationById)


export default router
