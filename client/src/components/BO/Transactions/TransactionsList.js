import React, { useState } from 'react'
import { Container, Paper, ListItem, List, Typography, ListItemText, makeStyles, ListItemAvatar, Avatar, Collapse, Divider } from '@material-ui/core'
import useTransactions from './useTransactions';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import TransactionDetails from './TransactionDetails';
import PrivateComponent from '../Auth/PrivateComponent';
import useAuth from '../Auth/useAuth';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
    },
}));

function TransactionsList() {

    const [{ transactions }, { getTransaction, cancelOperation , createRefundIntent}] = useTransactions();
    const [{ user }] = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    
    const [selectedTransaction, selectTransaction] = useState(null);
    
    const onSelect = idTransaction => {
        getTransaction(idTransaction, (err, data) => {
            if (err) return enqueueSnackbar('Oops, an error occured', { variant: 'error', autoHideDuration: 3000 });
            selectTransaction(data);
        });
    };
    
    const handleCreateRefundIntent = (idTransaction, amount) => {
        createRefundIntent(idTransaction, amount, user.credentials, (err, data) => {
            if (err) return enqueueSnackbar('Oops, an error occured', { variant: 'error', autoHideDuration: 3000 });
        });
    };
 
    const { container } = useStyles();

    return (
        <Container className={container} maxWidth='sm'>
            <Paper>

                <List>
                    { transactions.map((transaction, key) => (
                            <React.Fragment>
                                <Transaction 
                                    key={key} 
                                    transaction={transaction} 
                                    onSelect={onSelect}
                                    selectedTransaction={selectedTransaction}
                                    goBack={() => selectTransaction(null)}
                                    cancelOperation={cancelOperation}
                                    createRefundIntent={handleCreateRefundIntent}
                                />
                                {(key !== transactions.length-1) && <Divider />}
                            </React.Fragment>
                        )) 
                    }
                </List>

            </Paper>
        </Container>
    )
}

const Transaction = ({ transaction, onSelect, selectedTransaction, goBack, cancelOperation, createRefundIntent }) => {
    
    return (
        <React.Fragment>
            <ListItem button alignItems="flex-start" onClick={e => onSelect(transaction.id)}>
                <ListItemAvatar>
                    <Avatar alt={`${transaction.customer.firstname} ${transaction.customer.lastname}`}/>
                </ListItemAvatar>
                <ListItemText
                    primary={<><strong>#{transaction.id}</strong> - {transaction.customer.firstname} {transaction.customer.lastname}, le {moment(transaction.createdAt).format('DD/MM/YYYY')}</>}
                    secondary={
                        <React.Fragment>
                            <PrivateComponent type='admin'>
                                <Typography component='p' color='primary'>
                                    {transaction.User.firstname} {transaction.User.lastname} | {transaction.User.email}
                                </Typography>
                            </PrivateComponent>
                            <Typography
                                component="span"
                                variant="h6"
                                color="primary"
                            >
                                {transaction.total} {' '}
                                <Typography component='span' variant='subtitle2'>
                                    {transaction.currency}
                                </Typography>
                            </Typography>
                            {" -- "} {transaction.basket.length} product(s)
                        </React.Fragment>
                    }
                />
            </ListItem>

            <Collapse in={selectedTransaction && selectedTransaction.id === transaction.id}>
                {
                    selectedTransaction && (
                        <TransactionDetails 
                            goBack={goBack}
                            transaction={selectedTransaction}
                            cancelOperation={cancelOperation}
                            createRefundIntent={createRefundIntent}
                        />
                    )
                }
            </Collapse>

        </React.Fragment>
    )
};

export default TransactionsList
