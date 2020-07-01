/*
  Fetches the latest job postings from GitHub jobs using a CRON worker
  The CRON worker is set to execute fetchGitHub every 1 minute
*/

var CronJob = require('cron').CronJob;
const fetchGitHub = require('./tasks/fetch-github');

var getJob = new CronJob('* * * * *', fetchGitHub, null, true, 'America/Los_Angeles');
console.log("Fetching GitHub jobs...");
getJob.start();