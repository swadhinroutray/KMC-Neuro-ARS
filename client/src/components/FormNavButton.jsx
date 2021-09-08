import React from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

export const FormNavButton = ({...props}) => {
        return (
            <Button
                variant="contained"
                color="primary"
                {...props}
            >
                
                <Link to="/form" style={{textDecoration: 'none', color:'white'}}><Typography variant="button">Create Appointment</Typography></Link>
            </Button>
        )
    }