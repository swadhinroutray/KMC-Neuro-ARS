import React from 'react'
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
    },
}));

export const AppointmentDateField = inject('formStore')(observer(({ formStore }) => {
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.paper}>
            <List>
                <ListSubheader>
                    Schedule FU Appointment from Discharge Date
                </ListSubheader>

                <ListItem divider >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            value={formStore.appointmentsControl["oneMonth"]}
                            onChange={e => formStore.setAppointmentControl("oneMonth", e.target.checked)}
                        />
                    </ListItemIcon>
                    <ListItemText id="oneMonth" primary="1 Month" />
                    <ListItemSecondaryAction>
                        <TextField
                            id="dateOneMonth"
                            name="dateOneMonth"
                            type="date"
                            value={formStore.dateOneMonth}
                            onChange={e => formStore.setDateOneMonth(e.target.value)}
                            disabled={!formStore.appointmentsControl["oneMonth"]}
                            InputProps={{ inputProps: { min: formStore.dateToday } }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem divider >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            value={formStore.appointmentsControl["threeMonths"]}
                            onChange={e => formStore.setAppointmentControl("threeMonths", e.target.checked)}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText id="threeMonths" primary="3 Months" />
                    <ListItemSecondaryAction>
                        <TextField
                            id="dateThreeMonths"
                            name="dateThreeMonths"
                            type="date"
                            onChange={e => formStore.setDateThreeMonths(e.target.value)}
                            disabled={!formStore.appointmentsControl["threeMonths"]}
                            value={formStore.dateThreeMonths}
                            InputProps={{ inputProps: { min: formStore.dateToday } }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem divider >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            value={formStore.appointmentsControl["sixMonths"]}
                            onChange={e => formStore.setAppointmentControl("sixMonths", e.target.checked)}
                        />
                    </ListItemIcon>
                    <ListItemText id="sixMonths" primary="6 Months" />
                    <ListItemSecondaryAction>
                        <TextField
                            id="dateSixMonths"
                            name="dateSixMonths"
                            type="date"
                            value={formStore.dateSixMonths}
                            onChange={e => formStore.setDateSixMonths(e.target.value)}
                            disabled={!formStore.appointmentsControl["sixMonths"]}
                            InputProps={{ inputProps: { min: formStore.dateToday } }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            value={formStore.appointmentsControl["oneYear"]}
                            onChange={e => formStore.setAppointmentControl("oneYear", e.target.checked)}
                        />
                    </ListItemIcon>
                    <ListItemText id="oneYear" primary="1 Year" />
                    <ListItemSecondaryAction>
                        <TextField
                            id="dateOneYear"
                            name="dateOneYear"
                            type="date"
                            value={formStore.dateOneYear}
                            onChange={e => formStore.setDateOneYear(e.target.value)}
                            disabled={!formStore.appointmentsControl["oneYear"]}
                            InputProps={{ inputProps: { min: formStore.dateToday } }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    );
}));
