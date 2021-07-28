import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import { navigate } from '../routes';
import Typography from '@material-ui/core/Typography';
import success from "../assets/success.svg";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${success})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center",
    },
    successed: {
        color: "green",
        textTransform: "uppercase",
        padding: theme.spacing(1),
    }
}));

function CheckoutConfirmedPage() {

    const classes = useStyles();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center" 
            className={classes.root}
        >
            <Typography variant="h3" component="h1" className={classes.successed}>confirmed</Typography>
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

export default CheckoutConfirmedPage
