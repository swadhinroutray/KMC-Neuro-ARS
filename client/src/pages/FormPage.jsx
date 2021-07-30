import React from 'react'
import { inject, observer } from 'mobx-react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EventIcon from '@material-ui/icons/Event';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

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

const FormPage = () => {
    const handleInput = (event) => {
        event.preventDefault()
    }
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const setInitialDates = () => {

    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
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
                        className={classes.textField}
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


                    <Paper variant="outlined">
                        <List>
                            <ListSubheader color="secondary">
                                Schedule Follow Up Appointment
                            </ListSubheader>
                            <ListItem divider >
                                <ListItemText id="oneMonth" primary="1 Month after discharge" />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider >
                                <ListItemText id="threeMonths" primary="3 Months after discharge" />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider >
                                <ListItemText id="sixMonths" primary="6 Months after discharge" />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem  >
                                <ListItemText id="oneYear" primary="1 Year after discharge" />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Paper>

                    <Select
                        margin="normal"
                        variant="outlined"
                        placeholder="Preferred Day of the Week"
                        id="dayOfWeek"
                        fullWidth
                    >
                        <MenuItem value={"mon"}>Monday</MenuItem>
                        <MenuItem value={"tue"}>Tuesday</MenuItem>
                        <MenuItem value={"wed"}>Wednesday</MenuItem>
                        <MenuItem value={"thu"}>Thursday</MenuItem>
                        <MenuItem value={"fri"}>Friday</MenuItem>
                        <MenuItem value={"sat"}>Saturday</MenuItem>
                        <MenuItem value={"sun"}>Sunday</MenuItem>
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
};
export { FormPage };
