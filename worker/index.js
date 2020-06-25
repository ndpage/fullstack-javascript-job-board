

var CronJob = require('cron').CronJob;
const fetchGitHub = require('./tasks/fetch-github');

var job = new CronJob('* * * * *', fetchGitHub, function() {
  console.log('You will see this message every minute');
}, null, true, 'America/Los_Angeles');
job.start();