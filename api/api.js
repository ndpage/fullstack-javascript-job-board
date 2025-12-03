
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const app = express()
const port = 3001

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// CORS configuration
const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

var redis = require('redis');
var client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    },
    password: process.env.REDIS_PASSWORD || undefined
});

// Handle Redis connection errors
client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

// Connect to Redis
(async () => {
    await client.connect();
})();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

app.get('/api/jobs', async(req, res) => {
    try {
        const jobs = await getAsync('GitHub');
        
        if (!jobs) {
            return res.status(404).json({ error: 'No jobs found' });
        }
        
        // Validate JSON before sending
        const parsedJobs = JSON.parse(jobs);
        console.log(parsedJobs.length);
        return res.json(parsedJobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/api/test', async(req, res) => {
    return res.status(200).json({hello:'World'})
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))