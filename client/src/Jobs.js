import React from 'react';
import './App.css'
import Typography from '@material-ui/core/Typography'
import Job from './Job.js'

export default function Jobs({jobs})
{
    return(
        <div className="jobs"> 
            <Typography variant="h4" component="h1">
                Jobs List
            </Typography>

            {
                jobs.map(
                    job => <Job job={job} />
                )
            }

        </div>
    )
}