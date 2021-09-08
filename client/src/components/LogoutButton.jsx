import React from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react';

export const LogoutButton = inject('loginStore')(
    observer(({ loginStore, ...rest }) => {
        return (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => loginStore.logout()}
                {...rest}
            >
                <Typography variant="button">Logout</Typography>
            </Button>
        )
    }
    ));