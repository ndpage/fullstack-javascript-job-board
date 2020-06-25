import React from 'react';
import logo from './logo.svg';
import './App.css';
import Jobs from './Jobs.js'


const mockJobs = [
  {title: 'SWE 1', company:'Google'},
  {title: 'SDE 1', company:'Facebook'},
  {title: 'Software Engineer 1', company:'Amazon'}
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Entry Level Software Engineer Job
      </header>

      <Jobs jobs={mockJobs} />
    
    </div>
  );
}

export default App;
