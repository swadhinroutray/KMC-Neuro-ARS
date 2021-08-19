import React from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

export const FormNavButton = () => {
        return (
            <Button
                variant="contained"
                style={{
                    position: "absolute",
                    left: '2vh',
                    top: '2vh',
                    margin: '1vh',
                }}
                color="primary"
                
            >
                
                <Link to="/appointments" style={{textDecoration: 'none', color:'white'}}><Typography variant="button">Create Appointment</Typography></Link>
            </Button>
        )
    }