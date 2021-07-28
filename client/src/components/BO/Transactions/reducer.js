import * as actions from './actions';

const initialState = {
    transactions: [],
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: action.payload,
            };
            break;

        case actions.CANCEL_OPERATION_SUCCESS:
            return {
                ...state,
                transactions: state.transactions.map(
                    trans => (trans.id !== action.payload.TransactionId) ? trans : {...trans, Operations: trans.Operations.findAndReplace(ope => ope.id === action.payload.id, action.payload)}
                ),
            };
            break;
            
        default:
            return state;
            break;
    }
}
