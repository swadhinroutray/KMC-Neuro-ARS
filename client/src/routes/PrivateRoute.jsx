import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = inject('loginStore')(
	observer(({ component: Component, loginStore, ...rest }) => {
		return (
			<Route
			render={props =>
				loginStore.authChecked && !loginStore.loggedIn ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		></Route>
		);
	}),
);