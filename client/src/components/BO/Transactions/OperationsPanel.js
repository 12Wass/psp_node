import React, { useState } from 'react'
import { makeStyles, Box, Chip, Typography, Button, Paper, InputBase } from '@material-ui/core';
import { formatCreditCard } from '../../../utils';
import { CallReceived as CallReceivedIcon, CallMade as CallMadeIcon, AttachMoney as AttachMoneyIcon } from '@material-ui/icons';
import confs from '../../../confs';
import PrivateComponent from '../Auth/PrivateComponent';

const { URL_API } = confs;

const useStyles = makeStyles(theme => ({
    operations: {
        borderLeft: '2px solid '+theme.palette.primary.main,
        padding: 0,
        margin: 0,
        listStyle: 'none',
    },
    timelineBubble: {
        position: 'absolute',
        top: 15, 
        left: -7, 
        width: 12, 
        height: 12, 
        borderRadius: 100, 
        backgroundColor: theme.palette.primary.main
    },
    waiting: {
        backgroundColor: 'orange',
        color: 'white',
    },
    completed: {
        backgroundColor: 'limeGreen',
        color: 'white',
    },
    canceled: {
        backgroundColor: 'fireBrick',
        color: 'white',
    },
    creditCard: {
        fontSize: 11,
    },
    cardInscription: {
        color: 'black',
        fontSize: 12,
    },
    titleInscription: {
        color: 'black',
        fontSize: 9,
    },
    colorWhite: {
        color: 'white',
        transform: 'scale(-1, 1)',
    }
}));

function OperationsPanel({ transaction, cancelOperation, createRefundIntent }) {

    const { Operations } = transaction;
    const [amount, setAmount] = useState(0);
    const classes = useStyles();
    
    return (
        <>

            <ul className={classes.operations}>
                {Operations.map(operation => (
                    <Operation
                        idTransaction={transaction.id} 
                        operation={operation} 
                        currency={transaction.currency} 
                        cancelOperation={cancelOperation}
                    />
                ))}
            </ul>

            <PrivateComponent type='saler'>
                <Box mt={4}>
                    <Paper>
                        <Box p={1} display='flex'>
                            <Box flex={1}>
                                <InputBase 
                                    fullWidth startAdornment={<AttachMoneyIcon />} 
                                    placeholder='Amount' type='number'
                                    name='amount'
                                    onChange={e => setAmount(e.target.value)}
                                />
                            </Box>
                            <Button disabled={!(amount > 0)} variant='contained' color='primary' onClick={() => createRefundIntent(transaction.id, amount)}>
                                Refund
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </PrivateComponent>
            
        </>
    )
}

const Operation = ({ operation, currency, idTransaction, cancelOperation }) => {

    const { timelineBubble, waiting, completed, canceled } = useStyles();

    const getStatusClassName = (status) => {
        switch (status) {
            case 'WAITING': return waiting;
            case 'COMPLETED': return completed;
            case 'CANCELED': return canceled;
        };
    };
    
    return (
        <li>
            <Box position='relative'>
                <Box className={timelineBubble} />
                <Box 
                    width='100%' px={2} py={1}
                    display='flex' flexDirection='column'
                >
                    
                    <Box display='flex'>
                        <Chip 
                            icon={<OperationIcon type={operation.type} />} 
                            className={getStatusClassName(operation.status)} size='small' 
                            label={operation.type} 
                        />
                        <Box mx={1}>
                            {operation.amount} {currency}
                        </Box>
                    </Box>

                    <Box width='100%' display='flex'>
                        {operation.status === 'COMPLETED' && <CreditCard card={operation.card} />}
                        {operation.status === 'WAITING' && (
                            <Box>
                                <Typography component='p' variant='subtitle2'>
                                    This operations is pending...
                                </Typography>
                                <PrivateComponent type='saler'>
                                    <Box display='flex'>
                                        <Box mr={1}>
                                            <Button color='primary' variant='outlined' size='small' onClick={() => cancelOperation(idTransaction, operation.id)}>
                                                Cancel
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button color='primary' variant='contained' size='small'>
                                                Complete
                                            </Button>
                                        </Box>
                                    </Box>
                                </PrivateComponent>
                            </Box>
                        )}
                    </Box>
                    
                </Box>
            </Box>
        </li>
    );
}

const OperationIcon = ({type}) => {

    const {colorWhite} = useStyles();
    
    return (type) === 'PAYMENT' ? <CallReceivedIcon className={colorWhite} /> : <CallMadeIcon className={colorWhite} />;
}

const CreditCard = ({ card }) => {
    const { creditCard, cardInscription, titleInscription } = useStyles();

    return (
        <Box display='flex' flexDirection='row'>
            <Box p={3}>
                <Typography className={titleInscription}>
                    Owner
                </Typography>
                <Typography className={cardInscription}>
                    {card.name}
                </Typography>
            </Box>
            <Box px={3} py={1}>
                <Typography className={titleInscription}>
                    Card number
                </Typography>
                <Typography className={cardInscription}>
                    {formatCreditCard(card.number.slice(0, 4))+' XXXX XXXX XXXX'}
                </Typography>
            </Box>
        </Box>
    );
}

export default OperationsPanel
