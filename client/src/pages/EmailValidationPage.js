import React, { useEffect, useState } from 'react'
import { navigate } from '../routes';
import { SIGNIN_VIEW } from './AuthPage';
import { useSnackbar } from 'notistack';
import useAuth from '../components/BO/Auth/useAuth';
import { Container, CircularProgress, Box, Typography } from '@material-ui/core';

function EmailValidationPage({ match }) {

    const { token } = match.params;

    const [auth, { confirmAccount }] = useAuth();
    const [validating, isValidating] = useState(true);
    const { enqueueSnackbar } = useSnackbar()
    
    useEffect(() => {
        const failed = () => enqueueSnackbar('Validation has failed. Retry later.', { variant: 'error', autoHideDuration: 5000 });
        // When this page is mounting
        // Looking for token
        isValidating(true);

        if (!token) {
            failed();
            navigate.push('AuthPage', { view: SIGNIN_VIEW });
        } else {
             confirmAccount({ token }, (err, data) => {
                if (!err) {
                    enqueueSnackbar('Your account is now valid!', { variant: 'success', autoHideDuration: 3000 });
                } else{
                    failed();
                }
                isValidating(false);
                navigate.replace('AuthPage', { view: SIGNIN_VIEW });
            }).catch(err => {
                failed();
                navigate.replace('AuthPage', { view: SIGNIN_VIEW });
            })
        }
    }, []);
    
    return (
        <Container maxWidth='xs'>
            <Box display='flex' flexDirection='column' alignItems='center' p={5}>
                <Typography component='p' color='primary'>
                    Confirmation in progress ...
                </Typography>
                <CircularProgress color='primary' />
            </Box>
        </Container>
    )
}

export default EmailValidationPage
