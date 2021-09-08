import React from 'react'
import { inject, observer } from 'mobx-react';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    accordiion: {
        marginTop: theme.spacing(2),
    },
}));

export const ReferralField = inject('formStore')(observer(({ formStore }) => {
    const classes = useStyles();
    return (
        <Accordion className={classes.accordiion} expanded={formStore.wasReferred}>
            <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <FormControl component="fieldset">
                    <FormControlLabel
                        value="end"
                        control={<Checkbox
                            color="primary"
                            tabIndex={-1}
                            value={formStore.wasReferred}
                            onChange={e => formStore.setWasReferred(e.target.checked)}
                            disableRipple />}
                        label="Was this patient referred?"
                        labelPlacement="end"
                    />
                </FormControl>
            </AccordionSummary>
            <AccordionDetails>
                {formStore.wasReferred &&
                    <div className={classes.paper}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="referrerName"
                            label="Referrer Name"
                            name="referrerName"
                            autoFocus
                            value={formStore.referrerName}
                            onChange={e => formStore.setReferrerName(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="referrerMobileNumber"
                            label="Referrer Mobile Number"
                            name="referrerMobileNumber"
                            autoFocus
                            value={formStore.referrerMobileNumber}
                            onChange={e => formStore.setReferrerMobileNumber(e.target.value)}
                        />
                    </div>
                }
            </AccordionDetails>
        </Accordion>
    );
}));
