import React, { useEffect } from 'react'
import { navigate } from '../routes';
import SigninPage from './SigninPage';
import SignupPage from './SignupPage';

export const SIGNUP_VIEW = 'signup', SIGNIN_VIEW = 'signin';

const ALLOWED_VIEWS = [ SIGNIN_VIEW, SIGNUP_VIEW ];

const VIEWS = {
    [SIGNIN_VIEW]: <SigninPage />,
    [SIGNUP_VIEW]: <SignupPage />,
};

function AuthPage({ match }) {

    const { view } = match.params;

    useEffect(() => {

        if (!ALLOWED_VIEWS.includes(view)) navigate.notFound();
        
    }, [ view ]);

    
    return VIEWS[view];
}

export default AuthPage
