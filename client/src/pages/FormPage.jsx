import React from 'react'
import { inject, observer } from 'mobx-react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EventIcon from '@material-ui/icons/Event';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { AppointmentDateField } from '../components/AppointmentDateField';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

const FormPage = inject('formStore')(observer(({ formStore }) => {
    const handleInput = (event) => {
        event.preventDefault()
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        formStore.submit()
    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs" >
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EventIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Appointment Scheduling Form
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="patientName"
                        label="Patient Name"
                        name="patientName"
                        autoFocus
                        onChange={handleInput}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="hospitalNumber"
                        label="Hospital Number"
                        id="hospitalNumber"
                        onChange={handleInput}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="dateDischarge"
                        name="dateDischarge"
                        label="Date of Discharge"
                        type="date"
                        fullWidth
                        value={formStore.dateDischarge}
                        onChange={e => formStore.setDischargeDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="diagnosis"
                        label="Diagnosis"
                        id="diagnosis"
                        multiline
                        minRows="2"
                        onChange={handleInput}
                    />

                    <AppointmentDateField />

                    <Select
                        variant="outlined"
                        placeholder="Preferred Day of the Week"
                        id="dayOfWeek"
                        label="Preferred Day of Week"
                        fullWidth
                        value={formStore.dayOfWeek}
                    >
                        <MenuItem value={"mon"}>Closest Monday</MenuItem>
                        <MenuItem value={"tue"}>Closest Tuesday</MenuItem>
                        <MenuItem value={"wed"}>Closest Wednesday</MenuItem>
                        <MenuItem value={"thu"}>Closest Thursday</MenuItem>
                        <MenuItem value={"fri"}>Closest Friday</MenuItem>
                        <MenuItem value={"sat"}>Closest Saturday</MenuItem>
                        <MenuItem value={"sun"}>Closest Sunday</MenuItem>
                    </Select>



                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </Container >
    );
}));
export { FormPage };
