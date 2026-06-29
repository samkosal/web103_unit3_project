import 'dotenv/config'
import { pool } from './database.js'

// create the locations and events tables (events.location references locations.id)
const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image TEXT,
            address VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(255),
            zip VARCHAR(255)
        );

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(255),
            time VARCHAR(255),
            image TEXT,
            location INTEGER REFERENCES locations(id)
        );
    `

    await pool.query(createTablesQuery)
    console.log('🟢 Created tables: locations, events')
}

// the 4 venues, inserted in the same order as the routes in App.jsx so their
// ids line up: echolounge=1, houseofblues=2, pavilion=3, americanairlines=4
const locations = [
    {
        name: 'Echo Lounge & Music Hall',
        image: 'https://picsum.photos/seed/echolounge/600/400',
        address: '1323 N Stemmons Fwy',
        city: 'Dallas',
        state: 'TX',
        zip: '75207'
    },
    {
        name: 'House of Blues',
        image: 'https://picsum.photos/seed/houseofblues/600/400',
        address: '2200 N Lamar St',
        city: 'Dallas',
        state: 'TX',
        zip: '75202'
    },
    {
        name: 'The Pavilion',
        image: 'https://picsum.photos/seed/pavilion/600/400',
        address: '3839 S Fitzhugh Ave',
        city: 'Dallas',
        state: 'TX',
        zip: '75210'
    },
    {
        name: 'American Airlines Center',
        image: 'https://picsum.photos/seed/americanairlines/600/400',
        address: '2500 Victory Ave',
        city: 'Dallas',
        state: 'TX',
        zip: '75219'
    }
]

const seedLocations = async () => {
    for (const location of locations) {
        const query = `
            INSERT INTO locations (name, image, address, city, state, zip)
            VALUES ($1, $2, $3, $4, $5, $6)
        `
        const values = [location.name, location.image, location.address, location.city, location.state, location.zip]
        await pool.query(query, values)
    }
    console.log(`🟢 Seeded ${locations.length} locations`)
}

// a few events per location; "location" is the id (1-4) of the venue above
const events = [
    { title: 'Indie Night Live',        date: '2026-07-12', time: '8:00 PM',  image: 'https://picsum.photos/seed/event1/600/400', location: 1 },
    { title: 'Acoustic Sessions',       date: '2026-08-03', time: '7:30 PM',  image: 'https://picsum.photos/seed/event2/600/400', location: 1 },
    { title: 'Blues & Soul Revue',      date: '2026-07-20', time: '9:00 PM',  image: 'https://picsum.photos/seed/event3/600/400', location: 2 },
    { title: 'Gospel Brunch',           date: '2026-07-26', time: '11:00 AM', image: 'https://picsum.photos/seed/event4/600/400', location: 2 },
    { title: 'Summer Rock Fest',        date: '2026-08-15', time: '6:00 PM',  image: 'https://picsum.photos/seed/event5/600/400', location: 3 },
    { title: 'Country Stars Tour',      date: '2026-09-05', time: '7:00 PM',  image: 'https://picsum.photos/seed/event6/600/400', location: 3 },
    { title: 'Arena Pop Spectacular',   date: '2026-10-01', time: '8:00 PM',  image: 'https://picsum.photos/seed/event7/600/400', location: 4 },
    { title: 'Championship Concert',    date: '2026-11-12', time: '7:30 PM',  image: 'https://picsum.photos/seed/event8/600/400', location: 4 }
]

const seedEvents = async () => {
    for (const event of events) {
        const query = `
            INSERT INTO events (title, date, time, image, location)
            VALUES ($1, $2, $3, $4, $5)
        `
        const values = [event.title, event.date, event.time, event.image, event.location]
        await pool.query(query, values)
    }
    console.log(`🟢 Seeded ${events.length} events`)
}

const reset = async () => {
    try {
        await createTables()
        await seedLocations()
        await seedEvents()
        console.log('✅ Database reset complete')
    }
    catch (error) {
        console.error('🔴 Error resetting database:', error.message)
    }
    finally {
        await pool.end()
    }
}

reset()
