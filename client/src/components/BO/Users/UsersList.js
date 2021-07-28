import React, { useEffect, useState } from 'react'
import { Container, List, ListItem, ListItemText, ListItemAvatar, Paper } from '@material-ui/core'
import useUsers from './useUsers';
import { useSnackbar } from 'notistack';
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons';

function UsersList() {

    const [{ users }, { getUsers }] = useUsers();
    const [fetching, isFetching] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        isFetching(true);
        getUsers((err, data) => {
            if (err) enqueueSnackbar('Cant load users... Try later', { variant: 'error', autoHideDuration: 3000 });
            isFetching(false);
        });
        
    }, []);
    
    return (
        <React.Fragment>
            <Container maxWidth='sm'>

                <List>
                    <Paper>
                        {
                            users.map(user => (
                                <UserCard user={user} />
                            ))
                        }                
                    </Paper>
                </List>
                
            </Container>
        </React.Fragment>
    )
}

const UserCard = ({ user }) => {

    return (
        <ListItem button>
            <ListItemAvatar>
                {user.confirmed ? (
                    <CheckIcon />
                ):(
                    <CloseIcon />
                )}
            </ListItemAvatar>
            <ListItemText
                primary={`${user.email} - ${user.firstname} ${user.lastname}`}
                secondary={`Will receive payment in ${user.currency}`}
            />
        </ListItem>
    );
}

export default UsersList;
