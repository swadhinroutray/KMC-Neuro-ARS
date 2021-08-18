import React from 'react';
import { Provider } from 'mobx-react'
import { Switch } from 'react-router';
import { Route } from "react-router-dom";
import { LoginPage, FormPage, AppointmentsPage } from '../pages'
import loginStore from '../models/LoginModel'
import formStore from '../models/FormModel'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {
    return (
        <Provider loginStore={loginStore} formStore={formStore}>
            <Switch>
                <Route path={'/login'} component={LoginPage}></Route>
                <Route path={'/form'} component={FormPage}></Route>
                <PrivateRoute path={'/appointments'} component={AppointmentsPage}></PrivateRoute>
            </Switch>
        </Provider>
    );
};