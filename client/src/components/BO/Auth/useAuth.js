import * as actions from './actions';
import { useSelector, useDispatch } from "../../../store";
import sdk from "./sdk";
import { navigate } from '../../../routes';
import { SIGNIN_VIEW } from '../../../pages/AuthPage';

// Lets create our custom Hook that linked interface with state interractions
function useAuth() {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const methods = {

        login: (credentials, cb) => sdk.login(credentials).then(res => {
            if (res.success) {
                dispatch({ type: actions.LOGIN_SUCCESS, payload: res });
                // Fire the cb
                if (cb) cb(null, res);
            } else {
                // Fire the cb
                if (cb) cb(res, null);
            }
        }),

        register: (user, cb) => sdk.register(user).then(res => {
            if (res.success) {
                dispatch({ type: actions.REGISTER_SUCCESS, payload: res });
                // Fire the cb
                if (cb) cb(null, res);
            } else {
                // Fire the cb
                if (cb) cb(res, null);
            }
        }),

        confirmAccount: (token, cb) => sdk.confirmAccount(token).then(data => {
            if (data.success) {
                if (cb) cb(null, data);
            } else {
                if (cb) cb(data, null);
            }
        }),

        confirm: (cb) => sdk.confirm().then(res => {
            if (res.success) {
                dispatch({ type: actions.CONFIRM_SUCCESS, payload: res });
                // Fire the cb
                if (cb) cb(null, res);
            } else {
                // Fire the cb
                if (cb) cb(res, null);
            }
        }).catch(err => cb(err, null)),

        logout: () => {
            navigate.push('AuthPage', { view: SIGNIN_VIEW });
            dispatch({ type: actions.LOGOUT, payload: null });
        },

        renewCredentials: (cb) => sdk.renewCredentials().then(data => {
            if (data.success) {
                dispatch({ type: actions.RENEW_CREDENTIALS_SUCCESS, payload: data });
                if (cb) cb(null, data);
            } else {
                if (cb) cb(data, null);
            }
        })
        
    };

    return [ auth, methods ];
    
}

export default useAuth;