import React, { useEffect, useState } from 'react'
import { CircularProgress, Box, Container, Paper } from '@material-ui/core';
import qs from 'querystring';
import confs from '../confs';
import { useSnackbar } from 'notistack';
import CheckoutError from '../components/BO/Checkout/CheckoutError';
import CheckoutForm from '../components/BO/Checkout/CheckoutForm';
import Transaction from '../config/transactions.config';

const { URL_API } = confs;

function CheckoutPage({ match }) {

    const {token } = match.params;

    const [ checkoutInfo, setCheckoutInfo ] = useState(null);
    const [error, setError ] = useState(false);

    const decodeToken = token => {
        if (token && token.split('.').length === 3) {
            return JSON.parse(atob(token.split('.')[1]));
        }
        return null;
    }

    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        
        const failed = () => enqueueSnackbar('We can\'t process payment for now.', { variant: 'error', autoHideDuration: 3000 });
        
        const decodedToken = decodeToken(token);

        if (decodedToken) {
            console.log('decodedToken', decodedToken);
            setCheckoutInfo(decodedToken);
        } else {
            failed();
            setError(true);
        }

    }, [ token ])

    if (!checkoutInfo && !error) return (
        <Box width='100%' height='100vh' display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress color='primary' />
        </Box>
    );

    if (error) return <CheckoutError />;

    return (
        <Container maxWidth='xs'>
            <Box 
                width='100%' minHeight='100vh'
                display='flex' justifyContent='center' alignItems='center'
            >
                <Box width='100%'>
                    <Paper>
                        <Box p={3}>
                            <CheckoutForm checkoutInfo={checkoutInfo} checkoutToken={token} />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
}

export default CheckoutPage
