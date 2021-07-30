import React from 'react';
import { Provider } from 'mobx-react'
import { Switch } from 'react-router';
import { Route } from "react-router-dom";
import { LoginPage, FormPage, AppointmentsPage } from '../pages'
import loginStore from '../models/LoginModel'

export const AppRouter = () => {
    return (
        <Provider loginStore={loginStore}>
            <Switch>
                <Route path={'/login'} component={LoginPage}></Route>
                <Route path={'/form'} component={FormPage}></Route>
                <Route path={'/appointments'} component={AppointmentsPage}></Route>
            </Switch>
        </Provider>
    );
};