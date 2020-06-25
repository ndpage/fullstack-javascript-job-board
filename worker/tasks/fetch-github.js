
var fetch = require('node-fetch');

const baseURL = 'https://jobs.github.com/positions.json'

module.exports = async function fetchGitHub(){

const allJobs = [];
    let resultCount = 1;
    let onPage = 0;

    while(resultCount > 0){
        const response = await fetch(`${baseURL}?page=${onPage}`); //
        const jobs = await response.json();
        allJobs.push(...jobs);

        resultCount = allJobs.length;
        onPage++;
    }
    console.log('Got ', allJobs.length, ' jobs')
    
}

fetchGitHub();

module.exports();