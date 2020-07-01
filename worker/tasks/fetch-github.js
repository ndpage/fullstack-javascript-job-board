var fetch = require('node-fetch');

const baseURL = 'https://jobs.github.com/positions.json'

module.exports = async function fetchGitHub(){

const allJobs = [];
    let resultCount = 1;
    let onPage = 0;

    while(resultCount > 0){
        const res = await fetch(`${baseURL}?page=${onPage}`); //
        const jobs = await res.json();
        resultCount = jobs.length; // Asign the number of found jobs to resultCount to check while stop condition
        allJobs.push(...jobs);
        onPage++; //increment page number for next loop
        console.log(`${jobs.length} on page ${onPage}`);
    }
    console.log('Got', allJobs.length, 'jobs on', --onPage, 'pages');
}

module.exports();