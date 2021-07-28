import React, { useState } from 'react'
import { AppBar, Toolbar, Box, IconButton, Typography, Tabs, Tab } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import CustomerPanel from './CustomerPanel';
import OperationsPanel from './OperationsPanel';

const TabsPanel = [
    {
        label: 'Customer',
        component: CustomerPanel,
    },
    {
        label: 'Operations',
        component: OperationsPanel,
    },
];

function TransactionDetails({ goBack, transaction, cancelOperation, createRefundIntent }) {

    const [tab, setTab] = useState('Customer');
    
    const handleChange = (e, value) => {
        setTab(value);
    };
    
    return (
        <React.Fragment>
            <AppBar elevation={0} color='primary' position='sticky' style={{zIndex: 99}}>
                <Toolbar>
                    <IconButton onClick={goBack} color='secondary'>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant='h6'>
                        Transaction details
                    </Typography>
                </Toolbar>
                <Tabs value={tab} onChange={handleChange} aria-label="simple tabs example">
                    {TabsPanel.map(_tab => <Tab key={_tab.label} label={_tab.label} value={_tab.label} />)}
                </Tabs>
            </AppBar>
            {
                TabsPanel.map(_tab => (
                    <Panel key={_tab.label} transaction={transaction} tab={_tab} value={tab} index={_tab.label} cancelOperation={cancelOperation} createRefundIntent={createRefundIntent} />
                ))
            }
        </React.Fragment>
    )
}

const Panel = ({ children, value, index, transaction, tab, cancelOperation, createRefundIntent, ...other }) => {
    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography variant='h6' color='primary'> 
                  {tab.label}
              </Typography>
              <tab.component transaction={transaction} cancelOperation={cancelOperation} createRefundIntent={createRefundIntent} />
            </Box>
          )}
        </div>
      );
}

export default TransactionDetails
