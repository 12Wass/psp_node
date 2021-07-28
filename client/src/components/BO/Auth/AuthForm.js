import React, { useState, useEffect } from 'react'
import useAuth from './useAuth'
import { navigate } from '../../../routes';
import { TextField, Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    }
}));

function AuthForm() {

    const [{ user, token }, { login }] = useAuth();
    const [loging, isLoging] = useState(false);

    const [credentials, setCredentials] = useState({});
    const [error, isError] = useState(false);
    
    const onChange = e => setCredentials({...credentials, [e.target.name]: e.target.value});

    const onSubmit = (e, v) => {
        e.preventDefault();
        isLoging(true);
        isError(false);
        // Call login from hook
        login(credentials, (err, res) => {
            if (!err) {
                // Success
                navigate.push('DashboardPage');
            } else {
                isError(true);
            }
            isLoging(false);
        });
    }

    useEffect(() => {
        // Redirect to dashboard if current user already logged in
        if (user && token) navigate.push('DashboardPage');
    }, []);

    // Add style
    const { form } = useStyles();
    
    return (
        <form className={form} onSubmit={onSubmit}>
            <Typography variant='h4' color='primary'>
                Sign in
            </Typography>
            <TextField error={error} helperText={error && 'Invalid account'} required fullWidth onChange={onChange} label='Email address' name='email' type='text' />
            <TextField error={error} helperText={error && 'Invalid account'} required fullWidth onChange={onChange} label='Password' name='password' type='password' />
            
            <Button disabled={loging} fullWidth type='submit' color='primary' variant='contained'>
                {loging ? `Loging in...` : `Log in`}
            </Button>
        </form>
    );
}

export default AuthForm
