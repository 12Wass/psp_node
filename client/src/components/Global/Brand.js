import React from 'react';
import StoreIcon from '@material-ui/icons/Store';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    containerPrimary: {
        color: theme.palette.primary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: 'pointer'
    },
    containerContrast: {
        color: theme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: 'pointer'
    },
    shopLogo: {
        margin: theme.spacing(2)
    },
}));

function Brand({contrastText}) {

    const classes = useStyles();

    return (
        <div className={contrastText ? classes.containerContrast : classes.containerPrimary}>
            <StoreIcon className={classes.shopLogo} />
            <Typography variant="h6" className={classes.title}>Buy your language</Typography>
        </div>
    )
}

export default Brand
