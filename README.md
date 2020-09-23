# fullstack-javascript-job-board

This web app is a React app that was boostrapped using *create-react-app*. 
The app pulls data from an Express API that is located in api/api.js. The API has two routes:
  */api/test*
  */api/jobs*

The **/api/jobs** route provides a list of jobs in the form of an array of JavaScript objects (JSON). The API retrieves job data from the GitHub Jobs API and stores them in a Redis database. 

