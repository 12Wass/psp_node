import { request } from "../../../request";
import confs from '../../../confs';

const { URL_API } = confs;

export default {

    //
    getTransactions: () => request.get(`${URL_API}/transactions`),

    //
    getTransaction: (idTransaction) => request.get(`${URL_API}/transactions/${idTransaction}`),

    //
    createRefundIntent: (idTransaction, amount, credentials) => 
        request.post(`${URL_API}/me/transactions/${idTransaction}/refund`, { amount }, { Authorization: 'Basic ' + `${btoa(`${credentials.user}:${credentials.password}`)}`}),

    cancelOperation: (idTransaction, idOperation) => 
        request.post(`${URL_API}/transactions/${idTransaction}/operations/${idOperation}/cancel`),

};
