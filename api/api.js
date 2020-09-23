const express = require('express')
const app = express()
const port = 3001

var redis = require('redis');
var client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

app.get('/api/jobs', async(req, res) => {
    const jobs = await getAsync('GitHub');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    console.log(JSON.parse(jobs).length);
    return res.send(jobs) 
})
app.get('/api/test', async(req, res) => {
  
    return(
        res.status(201).json({hello:'World'})
    ) 
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))