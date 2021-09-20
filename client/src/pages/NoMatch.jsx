import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const NoMatch = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <SearchOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Page not Found.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    <Link
                        to="/form"
                        style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="button">Go Back</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
};

export { NoMatch }
