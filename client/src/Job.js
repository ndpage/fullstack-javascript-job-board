import React from 'react';

export default function Job({job})
{
    return(
        <div className="job">
            <div class="job-title">{job.title}</div> 
            <div class="job-company">{job.company}</div> 
        </div>
    )
}