

var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

// Promisify redis get functions 
const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGitHub(){

const allJobs = [];
    let resultCount = 1;
    let onPage = 0;

    while(resultCount > 0){
        const res = await fetch(`${baseURL}?page=${onPage}`); //
        const jobs = await res.json();
        resultCount = jobs.length; // Asign the number of found jobs to resultCount to check while stop condition
        allJobs.push(...jobs);
        console.log(`${jobs.length} on page ${onPage}`);
        onPage++; //increment page number for next loop
    }
    
    console.log('Got', allJobs.length, 'jobs on', --onPage, 'pages');
    const success = await setAsync('GitHub', JSON.stringify(allJobs));
    console.log({success});
}
module.exports = fetchGitHub;