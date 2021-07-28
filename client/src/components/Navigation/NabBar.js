import React, { useState } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import roles from '../../configs/roles';
import { navigate } from '../../routes';
import Brand from '../Global/Brand';
import styled from 'styled-components';
import palette from '../../theme.js';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.contrastText
    },
    shopLogo: {
        margin: theme.spacing(2)
    },
}));

const NavGrid = styled(Grid)`
&& {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 30px;
  cursor: pointer
}
`;

const NavTab = styled(Tab)`
&& {
  background-color: #491F58; 
}
`;


const NavBar = ({role, selectedItem, setSelectedItem}) => {
    
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setSelectedItem(newValue);
      };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <NavGrid onClick={() => navigate.push("SiteMarchandPage")}>
                            <Brand contrastText />
                        </NavGrid>

                        <NavGrid onClick={() => navigate.push("CustomerPage")}>
                            {roles.CUSTOMER}
                        </NavGrid>

                        <NavGrid onClick={() => navigate.push("OrdersPage")}>
                            {roles.TRADER}
                        </NavGrid>

                        <NavGrid onClick={() => navigate.push("DashboardPage")}>
                            {roles.ADMINISTRATOR}
                        </NavGrid>

                        <NavGrid>
                            { role === roles.TRADER &&
                                <Tabs value={selectedItem} onChange={handleChange}>
                                    <NavTab label={"Orders"} onClick={() => navigate.push("OrdersPage")} />
                                    <NavTab label={"Settings"} onClick={() => navigate.push("SettingsPage")}/>
                                </Tabs>
                            }
                        </NavGrid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}
 
export default NavBar;