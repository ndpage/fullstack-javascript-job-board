import React from 'react';
import './App.css';
import Jobs from './Jobs.js'

const JOB_API_URL = 'http://localhost:3001/jobs'; //define the job api url

async function fetchJobs(updateCB){
  const res = await fetch(JOB_API_URL); //fetch() is a built-in browser function
  const json = await res.json();  // wait for the json response
  // console.log({json});
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
        Entry Level Software Engineer Jobs
      </header>

      <Jobs jobs={jobList} />
    </div>

  );//end of return funtion
}

export default App;
