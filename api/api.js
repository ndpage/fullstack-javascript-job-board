
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const port = 3001

// Add security headers
app.use(helmet())

// Configure CORS with specific origin
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200
}))

var redis = require('redis');
var client = redis.createClient();

// Connect to Redis (required in v4+)
client.connect().catch((error) => {
    console.error('Failed to connect to Redis:', error);
});

app.get('/api/jobs', async(req, res) => {
    try {
        const jobs = await client.get('GitHub');
        if (jobs) {
            console.log(JSON.parse(jobs).length);
            return res.send(jobs)
        } else {
            return res.status(404).json({ error: 'No jobs found' })
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({ error: 'Internal server error' })
    }
})
app.get('/api/test', async(req, res) => {
  
    return(
        res.status(201).json({hello:'World'})
    ) 
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))