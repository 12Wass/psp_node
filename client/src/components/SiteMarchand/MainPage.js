import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import salesLogo from '../../assets/sales.svg'
import styled from 'styled-components';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    container: {
        height: '95vh',
        backgroundImage: `url(${salesLogo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    WhoAmIButton: {
        textAlign: 'center'
    }
  }));


function MainPage() {

    const classes = useStyles();

    return (
        <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.container}
        >
        </Grid>
    )
}

export default MainPage
