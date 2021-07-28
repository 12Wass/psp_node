import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import { navigate } from '../../../routes';
import { Route } from 'react-router';
import { SIGNIN_VIEW } from '../../../pages/AuthPage';
import { CircularProgress, Box } from '@material-ui/core';
import PrivateDataLoader from './PrivateDataLoader';

function PrivateRoute ({ type, ...props}) {

    const [{ user, token }, { confirm }] = useAuth();
    const [confirming, isConfirming] = useState(true);

    useEffect(() => {
        // Confirm the token before rendering the page
        isConfirming(true);
        confirm((err, res) => {
            if (err) {
                navigate.push('AuthPage', { view: SIGNIN_VIEW }); // Redirect to the login page
            }
            // Stop confirming
            isConfirming(false);
        })
    }, [ token ]);

    if (confirming) return (
        <Box 
            width='100%' height='100vh'
            display='flex' justifyContent='center' alignItems='center'
        >
            <CircularProgress color='primary' />
        </Box>
    )

    if (type && !type.split('|').includes(user.type)) navigate.push('NotFoundPage');
    
    return (
        <React.Fragment>
            <PrivateDataLoader />
            <Route {...props} />
        </React.Fragment>
    );
}

export default PrivateRoute
