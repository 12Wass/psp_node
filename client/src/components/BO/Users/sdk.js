import { request } from "../../../request";

import confs from '../../../confs';

const { URL_API } = confs;

export default {

    getUsers: () => request.get(`${URL_API}/users`),
    
};
