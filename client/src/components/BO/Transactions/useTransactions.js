import * as actions from './actions';
import { useSelector, useDispatch } from '../../../store';
import sdk from './sdk';
import { navigate } from '../../../routes';

function useTransactions() {

    const transactions = useSelector(state => state.transactions);
    const dispatch = useDispatch();

    const methods = {

        getTransactions: (cb) => sdk.getTransactions().then(data => {
            if (data.success) {
                dispatch({ type: actions.GET_TRANSACTIONS_SUCCESS, payload: data.transactions });
                
                if (cb) cb(null, data.transactions);
            } else {
                dispatch({ type: actions.GET_TRANSACTIONS_FAILED });
                
                if (cb) cb(data, null);
            }
        }).catch(err => cb(err, null)),

        //
        getTransaction: (idTransaction, cb) => sdk.getTransaction(idTransaction).then(data => {
            if (data.success) {
                if (cb) cb (null, data.transaction);
            } else {
                if (cb) cb (data, null);
            }
        }),

        cancelOperation: (idTransaction, idOperation, cb) =>  window.confirm('Are you want to cancel this operation ?') && sdk.cancelOperation(idTransaction, idOperation).then(data => {
            if (data.success) {
                dispatch({ type: actions.CANCEL_OPERATION_SUCCESS, payload: data.operation });
                if (cb) cb (null, data.operation);
            } else {
                if (cb) cb (data, null);
            }
        }),

        createRefundIntent: (idTransaction, amount, credentials, cb) =>  sdk.createRefundIntent(idTransaction, amount, credentials).then(data => {
            if (data.success) {
                dispatch({ type: actions.CREATE_REFUND_INTENT_SUCCESS, payload: data.transaction });
                if (cb) cb (null, data.transaction);
                
                window.location.href = data.transaction.checkoutForm;
            } else {
                if (cb) cb (data, null);
            }
        }),
        
    };
    
    return [ transactions, methods ];
}

export default useTransactions;