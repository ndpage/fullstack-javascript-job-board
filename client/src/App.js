
import React from 'react';
import './App.css';
import Jobs from './Jobs.js'


const JOB_API_URL = 'http://localhost:3001/api/jobs'; //define the api URL

/*
 *  Function: fetchJobs(UpdateCB) 
 *  Description: Gets the job list as a JSON response from the API (See API URL above)
 */
async function fetchJobs(updateCB){
  const res = await fetch(JOB_API_URL); //fetch() is a built-in browser function
  const json = await res.json();  // wait for the json response
  updateCB(json);
}

function App() {
const [jobList, updateJobs] = React.useState([]);
React.useEffect(()=>{
  fetchJobs(updateJobs);
}, []);

  return (
    <div className="App">
      <header className="App-header">
        Entry Level Jobs
      </header>
      <main>
        <Jobs className="jobs" jobs={jobList} />
      </main> 
      <footer> 
        <p> 
          Copyright 2020 Nathan Page
        </p>
      </footer>
    </div>

  );//end of return funtion
}

export default App;
