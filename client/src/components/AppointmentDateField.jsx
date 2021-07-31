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

export const AppointmentDateField = inject('formStore')(observer(({ formStore }) => {
    return (
        <Paper variant="outlined">
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
                            value={formStore.commonAppointmentsControl["oneMonth"]}
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
                            disabled={!formStore.commonAppointmentsControl["oneMonth"]}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem divider >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            value={formStore.commonAppointmentsControl["threeMonths"]}
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
                            disabled={!formStore.commonAppointmentsControl["threeMonths"]}
                            value={formStore.dateThreeMonths}
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem divider >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            value={formStore.commonAppointmentsControl["sixMonths"]}
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
                            disabled={!formStore.commonAppointmentsControl["sixMonths"]}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            value={formStore.commonAppointmentsControl["oneYear"]}
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
                            disabled={!formStore.commonAppointmentsControl["oneYear"]}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    );
}));
