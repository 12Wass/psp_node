import React from 'react'
import Header from '../components/BO/Header'
import useAuth from '../components/BO/Auth/useAuth';
import UsersList from '../components/BO/Users/UsersList';

function CustomersPage() {

    const [{ user }, { logout }] = useAuth();

    return (
        <>
            <Header
                username={`${user.firstname} ${user.lastname}`}
                credentials={user.credentials}
                logout={logout}
            />

            <UsersList />

        </>
    )
}

export default CustomersPage
