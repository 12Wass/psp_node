// Let's import request object to simply our request lecture
// Please take a look at request object, cause it does smthg with response before you get it
import { request } from "../../../request";
import confs from '../../../confs';

const { URL_API } = confs;

// Create a small sdk able to communicate with our API
export default {

    // Login action
    login: credentials => request.post(`${URL_API}/users/login`, credentials),

    // Register action
    register: user => request.post(`${URL_API}/users/register`, user),

    // Confirm action
    confirm: () => request.get(`${URL_API}/users/confirm`),

    //
    confirmAccount: token => request.post(`${URL_API}/users/confirm_account`, token),

    //
    renewCredentials: () => request.post(`${URL_API}/me/renew_credentials`),
    
};
