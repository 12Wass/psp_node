import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import { navigate } from '../routes';
import Typography from '@material-ui/core/Typography';
import failed from "../assets/failed.svg";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${failed})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    cancelled: {
        color: "red",
        textTransform: "uppercase",
        padding: theme.spacing(1),
    }
}));

function CheckoutCancelled() {

    const classes = useStyles();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center" 
            className={classes.root}
        >
            <Typography variant="h3" component="h1" className={classes.cancelled}>Cancelled</Typography>
            <Button
                variant="contained"
                color="secondary"
                size="large" 
                onClick={() => navigate.push("SiteMarchandPage")}
            >
                HomePage
            </Button>
        </Box>
    )
}

export default CheckoutCancelled
