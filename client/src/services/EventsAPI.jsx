const BASE_URL = '/api/events'

// get all events from the API
const getAllEvents = async () => {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    return data
}

// get a single event by its id
const getEventById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`)
    const data = await response.json()
    return data
}

// get all events that belong to a given location
const getEventsByLocationId = async (locationId) => {
    const response = await fetch(`${BASE_URL}/location/${locationId}`)
    const data = await response.json()
    return data
}

export default { getAllEvents, getEventById, getEventsByLocationId }
