import React from 'react'
import { Typography, makeStyles } from '@material-ui/core';
import {┬áReceipt as ReceiptIcon, LocalShipping as LocalShippingIcon } from '@material-ui/icons';

function CustomerPanel({┬átransaction }) {

    const { customer } = transaction;
    
    return (
        <>
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
            
        </>
    )
}

export default CustomerPanel
