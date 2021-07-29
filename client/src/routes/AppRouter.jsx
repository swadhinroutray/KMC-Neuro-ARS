import React from 'react';
import { Switch } from 'react-router';
import { Route } from "react-router-dom";
import { LoginPage, FormPage, AppointmentsPage } from '../pages'


export const AppRouter = () => {
    return (
        <Switch>
            <Route path={'/login'} component={LoginPage}></Route>
            <Route path={'/form'} component={FormPage}></Route>
            <Route path={'/appointments'} component={AppointmentsPage}></Route>
        </Switch>
    );
};