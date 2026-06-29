const BASE_URL = '/api/locations'

// get all locations from the API
const getAllLocations = async () => {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    return data
}

// get a single location by its id
const getLocationById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`)
    const data = await response.json()
    return data
}

export default { getAllLocations, getLocationById }
