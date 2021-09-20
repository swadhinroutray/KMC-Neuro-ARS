import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {FormNavButton} from '../components/FormNavButton'
import {LogoutButton} from '../components/LogoutButton'
import {Table} from '../components/Table'
import {Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog'
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));
  
const AppointmentsPage = inject('formStore', 'loginStore')(observer(({ formStore, loginStore }) => {
    useEffect(() => {
        loginStore.refreshAuth();
    }, [loginStore]);
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Upcoming Appointments
                    </Typography>
                    <FormNavButton />
                    <LogoutButton/>
                </Toolbar>
            </AppBar>
            <Table />
            <DeleteConfirmDialog />
            <ToastContainer/>
            {loginStore.authChecked && !loginStore.loggedIn ? (<Redirect to="/login" />) : null}
        </div>
    );
}));

export { AppointmentsPage };