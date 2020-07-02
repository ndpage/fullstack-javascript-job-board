

var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

// Promisify redis database get functions 
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGitHub(){

    // Fetch all jobs on GitHub
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
    console.log('Got', allJobs.length, 'total jobs');

    // filter algorithm for removing senior level jobs
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        
        if(
            jobTitle.includes('lead')||jobTitle.includes('senior')||jobTitle.includes('manager')||jobTitle.includes('principle')||jobTitle.includes('sr.')||jobTitle.includes('architect')
        ){
            return false;
        }

        return true;
        }
    );

    console.log('Got', jrJobs.length, 'junior jobs');
    // Set data in redis database
    const success = await setAsync('GitHub', JSON.stringify(jrJobs));
    console.log({success});
}

module.exports = fetchGitHub;