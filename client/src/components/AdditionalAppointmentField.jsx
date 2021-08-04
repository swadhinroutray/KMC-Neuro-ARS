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

export const AdditionalAppointmentDateField = inject('formStore')(observer(({ formStore }) => {
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.paper}>
            <List>
                <ListSubheader>
                    Schedule an additional appointment.
                </ListSubheader>
                <ListItem>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            value={formStore.appointmentsControl["additional"]}
                            onChange={e => formStore.setAppointmentControl("additional", e.target.checked)}
                        />
                    </ListItemIcon>
                    <ListItemText id="additional" primary="Additional" />
                    <ListItemSecondaryAction>
                        <TextField
                            id="dateAdditional"
                            name="dateAdditional"
                            type="date"
                            value={formStore.dateAdditional}
                            onChange={e => formStore.setDateAdditional(e.target.value)}
                            disabled={!formStore.appointmentsControl["additional"]}
                            InputProps={{ inputProps: { min: formStore.dateToday } }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    );
}));
