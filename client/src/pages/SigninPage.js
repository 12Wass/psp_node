import React from 'react';
import AuthForm from '../components/BO/Auth/AuthForm';
import { Container, Box, Paper, Link, Typography } from '@material-ui/core';
import { getRoutePathByName } from '../routes';
import { SIGNUP_VIEW } from './AuthPage';
import NavBar from "../components/Navigation/NabBar";

function SigninPage() {
    return (
        <Container  maxWidth='lg'>
            <NavBar />
            <Box py={5}>
                <Paper>
                    <Box p={5}>

                        <AuthForm />
                        
                        <Typography variant='subtitle2' >
                            You do not have an account? {' '} 
                            <Link href={getRoutePathByName('AuthPage', { view: SIGNUP_VIEW })}>
                                Get one now
                            </Link>
                        </Typography>

                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default SigninPage;
