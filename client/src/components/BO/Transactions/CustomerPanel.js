import React from 'react'
import { Typography, makeStyles } from '@material-ui/core';
import { Receipt as ReceiptIcon, LocalShipping as LocalShippingIcon } from '@material-ui/icons';

function CustomerPanel({ transaction }) {

    const { customer } = transaction;
    
    return (
        <React.Fragment>
            <Typography component='p'>
                {customer.firstname} {customer.lastname}
            </Typography>
            <Typography component='p'>
                {customer.email}
            </Typography>

            <Typography component='p'>
                <ReceiptIcon /> {transaction.billingAddress}
            </Typography>
            <Typography component='p'>
                <LocalShippingIcon /> {transaction.deliveryAddress}
            </Typography>
            
        </React.Fragment>
    )
}

export default CustomerPanel
