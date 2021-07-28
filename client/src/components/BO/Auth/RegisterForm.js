import React, { useState, useEffect } from 'react'
import useAuth from './useAuth'
import { navigate } from '../../../routes';
import { Button, makeStyles, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { SIGNIN_VIEW } from '../../../pages/AuthPage';
import TransactionConfig from '../../../config/transactions.config';
import Input from '../../ui/Input';
import { useSnackbar } from 'notistack';

const Currencies = TransactionConfig.currencies;

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    }
}));

function RegisterForm() {

    const [auth, { register }] = useAuth();
    const [registering, isRegistering] = useState(false);
    const [error, setError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const [user, setUser] = useState({});
    
    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = (e, v) => {
        if (!isFormValid()) setError('Oops, the form is not valid');
        e.preventDefault();
        isRegistering(true);
        // Call login from hook
        register(user, (err, res) => {
            if (!err) {
                // Success
                enqueueSnackbar('We sent you a confirmation email. Please look at your spam.', { autoHideDuration: 3000 });
                navigate.push('AuthPage', { view: SIGNIN_VIEW });
            }
            isRegistering(false);
        });
    }

    // Add style
    const { form } = useStyles();

    const isPasswordValid = () => {
        console.log(user);
        
        return user.password && user.confirm_password && (user.password == user.confirm_password) && user.password.length > 5
    };
    const isCurrencyValid = () => Currencies.includes(user.currency);

    const isFormValid = () => isPasswordValid() && isCurrencyValid();

    const required = v => v && v.length > 0 ? undefined : 'This value is required';
    const passwordValidation = v => isPasswordValid() ? undefined : 'Passwords should match, and must be 6 chars length minimum';
    
    return (
        <form className={form} onSubmit={onSubmit}>
            <Typography variant='h4' color='primary'>
                Register
            </Typography>
            <Input validate={required} required fullWidth onChange={onChange} label='Email address' name='email' type='text' />
            <Input validate={required} required fullWidth onChange={onChange} label='Password' name='password' type='password' />
            <Input validate={passwordValidation} required fullWidth onChange={onChange} label='Confirm password' name='confirm_password' type='password' />
            <Input validate={required} required fullWidth onChange={onChange} label='Business siret' name='businessSiret' type='text' />
            <Input validate={required} required fullWidth onChange={onChange} label='Business name' name='businessName' type='text' />
            <Input validate={required} required fullWidth onChange={onChange} label='Firstname' name='firstname' type='text' />
            <Input validate={required} required fullWidth onChange={onChange} label='Lastname' name='lastname' type='text' />
            <Input validate={required} required fullWidth onChange={onChange} label='Phone' name='phone' type='text' />
            <Input validate={required} helperText={"Use to redirect customers after paiement."} required fullWidth onChange={onChange} label='Confirmation URL' name='confirmUrl' type='text' />
            <Input validate={required} helperText={"Use to redirect customers after paiement."} required fullWidth onChange={onChange} label='Cancellation URL' name='cancelUrl' type='text' />

            <FormControl required fullWidth>
                <InputLabel id="select-label">Currency</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    onChange={onChange}
                    name='currency'
                >
                    {Currencies.map(curr => <MenuItem key={curr.currency} value={curr.currency}>{curr.name}</MenuItem>)}
                </Select>
            </FormControl>
            
            <Button disabled={registering} fullWidth type='submit' color='primary' variant='contained'>
                {registering ? `Registering...`:`Register`}
            </Button>
        </form>
    );
}

export default RegisterForm
