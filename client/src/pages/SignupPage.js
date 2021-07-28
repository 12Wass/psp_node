import React from 'react';
import RegisterForm from '../components/BO/Auth/RegisterForm';
import { Container, Box, Paper, Typography, Link } from '@material-ui/core';
import { SIGNIN_VIEW } from './AuthPage';
import { getRoutePathByName } from '../routes';
import NavBar from "../components/Navigation/NabBar";

function SignupPage() {
    return (
        <Container  maxWidth='lg'>
            <NavBar />
            <Box py={5}>
                <Paper>
                    <Box p={5}>

                        <RegisterForm />

                        <Typography variant='subtitle2' >
                            Already have an account? {' '} 
                            <Link href={getRoutePathByName('AuthPage', { view: SIGNIN_VIEW })}>
                                Sign in now
                            </Link>
                        </Typography>

                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default SignupPage;
