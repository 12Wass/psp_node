import React, { useEffect } from 'react';
import { Chart } from "chart.js";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    charts: {
        padding: theme.spacing(1),
    }
}))

const generateCharts = (transactions) => {

    const formatedTransactions = transactions.reduce((acc, cur) => {
        const createdAt = cur.createdAt.split("T")[0];
        const existingIndex = acc.findIndex(element => element.createdAt === createdAt);

        if(existingIndex >= 0) {
            acc[existingIndex] = { 
                ...acc[existingIndex], 
                total: acc[existingIndex].total + cur.total,
                nbItems: acc[existingIndex].nbItems + cur.basket.length,
            }
        } else {
            acc.push({ 
                createdAt,
                total: cur.total,
                nbItems: cur.basket.length,
            })
        }

        return acc;
    }, [])
    

    const ctx = document.getElementById('totalPerDay').getContext('2d');
    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: formatedTransactions.map(trans => trans.createdAt),
            datasets: [{
                label: 'Total per day',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: formatedTransactions.map(trans => trans.total),
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Total per day'
            }
        }
    });

    const ctx2 = document.getElementById('itemsPerDay').getContext('2d');
    const chart2 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: formatedTransactions.map(trans => trans.createdAt),
            datasets: [{
                label: 'Items per day',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: formatedTransactions.map(trans => trans.nbItems),
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Items per day'
            }
        }
    });
}

const generateClaquinos = (transactions) => {

    const formatedClaquinos = transactions.reduce((acc, cur) => {
        if(!acc[cur.currency]) {
            return {
                ...acc,
                [cur.currency]: 1,
            }
        } else {
            return {
                ...acc,
                [cur.currency]: acc[cur.currency] + 1,
            }
        }
    }, {});

    const ctx = document.getElementById('currenciesUsage').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(formatedClaquinos),
            datasets: [{
                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
                data: Object.values(formatedClaquinos),
                labels: Object.keys(formatedClaquinos),
            }],
        },
        options: {
            title: {
                display: true,
                text: 'Currencies usage'
            }
        }
    });
    
}

const generateBars = (transactions) => {
    const formatedTrans = transactions.reduce((acc, cur) => {
        const formatedBasket = cur.basket
            .reduce((accumulator, current) => ({
                ...accumulator,
                [current.name]: current.quantity,
            }), {});

        Object.keys(formatedBasket).map(item => {
            if(!acc[item]) {
                acc[item] = formatedBasket[item];
            } else {
                acc[item] = acc[item] + formatedBasket[item];
            }
        })
        return acc;
    }, {});

    const ctx = document.getElementById('drivers').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(formatedTrans),
            datasets: [{
                backgroundColor: "#0074D9",
                data: Object.values(formatedTrans),
                label: "Quantity",
            }],
        },
        options: {
            title: {
                display: true,
                text: 'Drivers sales'
            }
        }
    });
}


function ChartsTrader({transactions}) {

    const classes = useStyles();

    useEffect(() => {
        generateCharts(transactions);
        generateClaquinos(transactions);
        generateBars(transactions);
    }, []);    

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            xs={12}
        >
            <Grid
                item
                justifyContent="center"
                alignItems="center"
                className={classes.charts}
                xs={12}
            >
                <Paper>
                    <Box>
                        <canvas id="totalPerDay"></canvas>
                    </Box>
                </Paper>
            </Grid>

            <Grid
                item
                justifyContent="center"
                alignItems="center"
                className={classes.charts}
                xs={12}
            >
                <Paper>
                    <Box>
                        <canvas id="itemsPerDay"></canvas>
                    </Box>
                </Paper>
            </Grid>

            <Grid
                item
                justifyContent="center"
                alignItems="center"
                className={classes.charts}
                md={6}
                xs={12}
            >
                <Paper>
                    <Box>
                        <canvas id="currenciesUsage"></canvas>
                    </Box>
                </Paper>
            </Grid>

            <Grid
                item
                justifyContent="center"
                alignItems="center"
                className={classes.charts}
                md={6}
                xs={12}
            >
                <Paper>
                    <Box>
                        <canvas id="drivers"></canvas>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ChartsTrader
