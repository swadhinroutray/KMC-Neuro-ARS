import React, {useEffect} from 'react'
import { inject, observer } from 'mobx-react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import EventIcon from '@material-ui/icons/Event';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { LogoutButton } from '../components/LogoutButton'
import {AppointmentNavButton} from '../components/AppointmentNavButton'
import { AppointmentDateField } from '../components/AppointmentDateField';
import { AdditionalAppointmentDateField } from '../components/AdditionalAppointmentField';
import { ReferralField } from '../components/ReferralField'
import {Redirect} from 'react-router-dom';

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

const FormPage = inject('formStore', 'loginStore')(observer(({ formStore, loginStore }) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        formStore.submit()
    }
    useEffect(() => {
        loginStore.refreshAuth();
    }, [loginStore]);

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs" >
            <div className={classes.paper}>
                <LogoutButton style={{
                    position: "absolute",
                    right: '2vh',
                    top: '2vh',
                    margin: '1vh',
                }}/>
                <AppointmentNavButton/>
                <Avatar className={classes.avatar}>
                    <EventIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Appointment Scheduling Form
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="patientName"
                        label="Patient Name"
                        name="patientName"
                        autoFocus
                        value={formStore.patientName}
                        onChange={e => formStore.setPatientName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="hospitalNumber"
                        label="Hospital Number"
                        id="hospitalNumber"
                        value={formStore.hospitalNumber}
                        onChange={e => formStore.setHospitalNumber(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="mobileNumber"
                        label="Mobile Number"
                        id="mobileNumber"
                        value={formStore.mobileNumber}
                        onChange={e => formStore.setMobileNumber(e.target.value)}
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
                        value={formStore.diagnosis}
                        onChange={e => formStore.setDiagnosis(e.target.value)}
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

                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel id="label-for-weekday-select">
                            Preferred Weekday for FU Appointment
                        </InputLabel>
                        <Select
                            id="dayOfWeek"
                            labelId="label-for-weekday-select"
                            label="Preferred Weekday for FU Appointment"
                            value={formStore.dayOfWeek}
                            onChange={e => formStore.setDayOfWeek(e.target.value)}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={"sun"} dense>Sunday</MenuItem>
                            <MenuItem value={"mon"} dense>Monday</MenuItem>
                            <MenuItem value={"tue"} dense>Tuesday</MenuItem>
                            <MenuItem value={"wed"} dense>Wednesday</MenuItem>
                            <MenuItem value={"thu"} dense>Thursday</MenuItem>
                            <MenuItem value={"fri"} dense>Friday</MenuItem>
                            <MenuItem value={"sat"} dense>Saturday</MenuItem>
                        </Select>
                    </FormControl>

                    <AppointmentDateField />
                    <AdditionalAppointmentDateField />
                    <ReferralField />

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

            {loginStore.authChecked && !loginStore.loggedIn ? (<Redirect to="/login" />) : null}
            {formStore.isSubmitted ? (<Redirect to="/form"/>) : null}
        </Container >
    );
}));
export { FormPage };
