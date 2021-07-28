import React, { useState } from 'react'
import { AppBar, Toolbar, Container, Box, Typography, IconButton, Button, useScrollTrigger, Slide, Dialog } from '@material-ui/core'
import { AccountBox as AccountBoxIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { navigate } from '../../routes';
import PrivateComponent from './Auth/PrivateComponent';
import useAuth from './Auth/useAuth';
import { useSnackbar } from 'notistack';


function HideOnScroll({ children }) {
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

function Header({ username, credentials, logout, ...props}) {

    const [_, { renewCredentials }] = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const [showCredentials, setShowCredentials] = useState(false);

    const onRenewCredentials = () => renewCredentials((err, data) => {
        if (err) enqueueSnackbar('Cant renew credentials for now... Retry later', { variant: 'error', autoHideDuration: 3000 });
    })
    
    return (
        <>
            <HideOnScroll {...props}>
                <AppBar color='secondary' style={{zIndex: 100}}>
                    <Toolbar disableGutters>
                        <Container maxWidth='lg'>
                            <Box
                                width='100%'
                                display='flex' justifyContent='space-between' alignItems='center'
                            >
                                <Box display='flex' alignItems='center'>
                                    <IconButton onClick={() => setShowCredentials(true)}>
                                        <AccountBoxIcon color='primary' />
                                    </IconButton>
                                    <Typography color='primary'>
                                        {username}
                                    </Typography>
                                </Box>
                               
                                <Box display='flex' alignItems='center'>
                                    <Box display='flex' alignItems='center'>
                                        <Tabs>
                                            <Tab label={"Dashboard"} onClick={() => navigate.push("DashboardPage")} />
                                            <Tab label={"Transactions"} onClick={() => navigate.push("TransactionsPage")} />
                                            <Tab label={"Home"} onClick={() => navigate.push("SiteMarchandPage")} />
                                            <PrivateComponent type='admin'>
                                                <Tab label={"Customers"} onClick={() => navigate.push("CustomersPage")} />
                                            </PrivateComponent>
                                        </Tabs>
                                    </Box>
                                    <Button 
                                        variant='outlined' color='primary' size='small'
                                        endIcon={<ExitToAppIcon />}
                                        onClick={logout}
                                    >
                                        Log out
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
            <PrivateComponent type='saler'>
                <Dialog open={showCredentials} onClose={() => setShowCredentials(false)}>
                    {
                        (credentials) && (
                            <Box p={3}>
                                <Box my={2}>
                                    <Typography component='p' variant='h6' color='primary'>
                                        Client token
                                    </Typography>
                                    <Typography component='p'>
                                        {credentials.user}
                                    </Typography>
                                    <Typography component='p' variant='h6' color='primary'>
                                        Client secret
                                    </Typography>
                                    <Typography component='p'>
                                        {credentials.password}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Button fullWidth variant='contained' color='primary' onClick={onRenewCredentials}>
                                        Renew credentials
                                    </Button>
                                </Box>
                            </Box>
                        )
                    }
                </Dialog>
            </PrivateComponent>
        </>
    )
}



export default Header
