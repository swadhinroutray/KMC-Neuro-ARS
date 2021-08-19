import React from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react';

export const LogoutButton = inject('loginStore')(
    observer(({ loginStore }) => {
        return (
            <Button
                variant="contained"
                style={{
                    position: "absolute",
                    right: '2vh',
                    top: '2vh',
                    margin: '1vh',
                }}
                color="secondary"
                onClick={()=> loginStore.logout()}
            >
                <Typography variant="button">Logout</Typography>
            </Button>
        )
    }
    ));