import React from 'react'
import useAuth from './useAuth'

function PrivateComponent({ type, children }) {

    const [{ user, token }] = useAuth();

    // Reject if user hasnt a token
    if (!token) return null;

    console.log("Type verification:", (type && !type.split('|').includes(user.type)));
    
    if (type && !type.split('|').includes(user.type)) return null;
    
    return children;
}

export default PrivateComponent
