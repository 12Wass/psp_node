import * as actions from './actions';

const initialState = {
    users: [],
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };
        
        default: 
            return state;
            break;
    }
    
}