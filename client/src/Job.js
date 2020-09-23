import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

export default function Job({job, onClick})
{
    return(
        
        <Paper className='job' onClick={onClick}>
            <div>  
                <Typography variant="h5">{job.title}  </Typography> 
                <Typography variant="h6">{job.company}</Typography>
                <Typography variant="h6">{job.location}</Typography>
            </div>
            <div> 
                <Typography> Posted {job.created_at.split(' ').slice(0,3).join(' ')}</Typography>
            </div>
        </Paper>
    )
}