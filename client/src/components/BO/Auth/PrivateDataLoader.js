import React from 'react'
import { useSnackbar } from 'notistack';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import useTransactions from '../Transactions/useTransactions';

function PrivateDataLoader() {

    const [{ transactions }, { getTransactions }] = useTransactions();;
    const { enqueueSnackbar } = useSnackbar();
    
    const [fetching, isFetching] = React.useState(false);
    
    // Enqueue here datas, may be refractor into a Promise.all form 
    React.useEffect(() => {

        isFetching(true);
        // Fetch transactions
        getTransactions((err, data) => {
            if (err) {
                enqueueSnackbar('Oops, an error occured', { variant: 'error', autoHideDuration: 3000 });
            }
            isFetching(false);
        });
        
    }, []);

    // Display a loader if theres no data inside
    if (transactions.length === 0 && fetching) return (
        <Box width='100%' height='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Typography variant='h6' color='primary'>
                Loading data...
            </Typography>
            <CircularProgress />
        </Box>
    );
    
    // This component doesnt render anythg
    return null;
}

export default PrivateDataLoader
