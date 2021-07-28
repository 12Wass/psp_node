import React, { useState, useEffect } from 'react'; 
import roles from '../configs/roles';
import NavBar from '../components/Navigation/NabBar';
import { Paper, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Basket from '../components/SiteMarchand/Basket';
import Brand from '../components/Global/Brand';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    container: {
        width: "80%",
        margin: "3rem auto"
    },
    informations: {
        padding: "2rem",
    },
    informationsTable: {
        padding: "0 3rem",
    },
    informationContainer: {
        textAlign: "center",
        padding: "1rem",
    },
    informationTitle: {
        textTransform: "uppercase",
        color: theme.palette.primary.main
    },
    title: {
        textAlign: "center",
        paddingTop: "2rem",
        textTransform: "uppercase",
        color: theme.palette.primary.main
    }
    
  }));

function OrderDetails(props) {

    const [selectedItem, setSelectedItem] = useState(0);
    const [amount, setAmount] = useState("");
    const [open, setOpen] = useState(false);
    const [transaction, setTransaction] = useState([]);
    const classes = useStyles();
    const id = parseInt(props.match.params.id);
    const { enqueueSnackbar } = useSnackbar();

     useEffect(() => {
        const secret = localStorage.getItem('secret');
        const token = localStorage.getItem('token');
        const credentials = `${token}:${secret}`;

        fetch('http://localhost:8888/me/transactions', {
            method: 'GET',
            headers: {
                Authorization: `Basic ${btoa(credentials)}`
            }
        }).then(data => data.json())
          .then(formatedOrders => {
            setTransaction(formatedOrders.transactions.find(t => t.id === id));
          })
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        if(parseInt(amount) >= parseInt(transaction.total)) {
            // Display snackbar to show error message
            setOpen(false);
            return enqueueSnackbar('Refund impossible due to too high amount', { autoHideDuration: 3000 });;
        }
        const token = localStorage.getItem('token');
        const secret = localStorage.getItem('secret');
        const credentials = `${token}:${secret}`;

        fetch(`http://localhost:8888/me/transactions/${id}/refund`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(credentials)}`,
                'Content-Type': "Application/json",
            },
            body: JSON.stringify({ amount }),
        }).then(data => data.json())
          .then(formatedData => {
            if(formatedData.transaction) {
                window.location.href = formatedData.transaction.checkoutForm;    
            }
          })
    }

    useEffect(() => {
        if(!!id) { 
        // Fetch with given ID   
        }
    }, [])

    return (
        <>
            <NavBar 
                role={roles.TRADER}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            { console.log(transaction)}
            <Paper className={classes.container}>
                <Typography
                        className={classes.title}
                        variant="h3"
                >
                    Order details n°{ id }
                </Typography>

                <Grid
                    container
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.informations}
                >
                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Lastname</Typography>
                        <Typography variant="body">{transaction.customer && transaction.customer.lastname}</Typography>
                    </Grid>

                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Firstname</Typography>
                        <Typography variant="body">{transaction.customer && transaction.customer.firtsname}</Typography>
                    </Grid>

                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Total</Typography>
                        <Typography variant="body">{transaction.total}</Typography>
                    </Grid>

                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Email</Typography>
                        <Typography variant="body">{transaction.customer && transaction.customer.email}</Typography>
                    </Grid>
                    
                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Billing adress</Typography>
                        <Typography variant="body">{transaction.billingAddress}</Typography>
                    </Grid>

                    
                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Delivery adress</Typography>
                        <Typography variant="body">{transaction.deliveryAdress ? transaction.deliveryAdress : transaction.billingAddress}</Typography>
                    </Grid>
                </Grid>
                
                <Grid
                    container
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.informationsTable}
                >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Subtotal</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {transaction.basket && transaction.basket.map((line) => (
                            <TableRow key={line.name}>
                            <TableCell align="center">{line.name}</TableCell>
                            <TableCell align="center">{line.quantity}</TableCell>
                            <TableCell align="center">{line.price}</TableCell>
                            <TableCell align="center">{ ((line.quantity) * (line.price)) }</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Grid>
            
                <Grid
                    container
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.informations}
                >
                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                    >
                        <Button onClick={() => setOpen(true)} fullWidth variant="contained" color="primary" size="large">Refund</Button>
                    </Grid>
                </Grid>
                
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <Brand />
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To refund this order, please fill the field below
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="amount"
                    label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="text"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
            </Paper>
        </>
    )
}

export default OrderDetails
