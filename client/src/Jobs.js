import React from 'react';
import './App.css'
import Typography from '@material-ui/core/Typography'
import Job from './Job.js'

// used for the page stepper 
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


export default function Jobs({jobs})
{
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs/50);
    
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep*50,activeStep*50+50); //pagination to 50 jobs per page

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return(
        <div className="jobs"> 
            <Typography variant="h4" component="h1">
                Jobs List
            </Typography>

            <Typography variant="h6" component="h1">
                Found {numJobs} jobs
            </Typography>
            <div> 
                Page {activeStep + 1} of {numPages}
            </div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                    Next
                    <KeyboardArrowRight />
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                </Button>
                }
            />
            {
                jobsOnPage.map(
                    job => <Job job={job} />
                    )
                }
        
    </div>

    );
}