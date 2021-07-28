import React from 'react'
import { Container, Paper, Box, Button } from '@material-ui/core'
import { navigate } from '../../../routes'

function CheckoutError() {
    return (
        <Container maxWidth='sm'>
            <Box height='100vh' display='flex' justifyContent='center' alignItems='center'>
                <Paper>
                    <Box p={3}>
                        The where an issue with you paiement request.
                        <Box mt={2}>
                            <Button variant='contained' color='primary' fullWidth onClick={() => navigate.replace('HomePage')}>
                                Go to the Home
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default CheckoutError
