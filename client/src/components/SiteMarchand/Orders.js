import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { navigate } from '../../routes';
import OrderDetailsPage from '../../pages/OrderDetailsPage';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  eye: {
      color: theme.palette.primary.main
  },
  container: {
      width: "80%",
      margin: "3rem auto"
  },
  containerPaper: {
    width: "80%",
    margin: "3rem auto"
  },
  title: {
      textAlign: "center",
      padding: "2rem",
      textTransform: "uppercase",
      color: theme.palette.primary.main,
  }

}));

const rows = [
    { 
        name: "Wassim",
        surname: "Dahmane",
        email: "wassimdah@gmail.com",
        billingAddress: "19 rue du Galion, 95380 Puiseux-en-France",
        deliveryAddress: "19 rue du Galion, 95380 Puiseux-en-France",
        total: 75,
    },
    {
        name: "Wassim",
        surname: "Dahmane",
        email: "wassimdah@gmail.com",
        billingAddress: "19 rue du Galion, 95380 Puiseux-en-France",
        deliveryAddress: "19 rue du Galion, 95380 Puiseux-en-France",
        total: 75,
    },
    {
        name: "Wassim",
        surname: "Dahmane",
        email: "wassimdah@gmail.com",
        billingAddress: "19 rue du Galion, 95380 Puiseux-en-France",
        deliveryAddress: "19 rue du Galion, 95380 Puiseux-en-France",
        total: 75,
    },
];

function Orders() {

    const [orders,setOrders] = useState([]);
    const classes = useStyles();

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
              if (formatedOrders.success) {
                setOrders(formatedOrders.transactions)
              }
          })
    }, []);

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Typography
                    className={classes.title}
                    variant="h3"
            >
                Orders listing
            </Typography>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Firstname</TableCell>
                    <TableCell align="center">Lastname</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Currency</TableCell>
                    <TableCell align="center">See</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                { console.log(orders) }
                {orders.map((order) => (
                    <TableRow key={order.id}>
                    <TableCell align="center">{order.customer.firtsname}</TableCell>
                    <TableCell align="center">{order.customer.lastname}</TableCell>
                    <TableCell align="center">{order.customer.email}</TableCell>
                    <TableCell align="center">{order.total}</TableCell>
                    <TableCell align="center">{order.currency}</TableCell>
                    <TableCell align="center">
                        <VisibilityIcon 
                            className={classes.eye}
                            onClick={() => navigate.push("OrdersDetailsPage", {id: order.id}) }
                        />
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Orders
