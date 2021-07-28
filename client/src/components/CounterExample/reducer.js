import * as actions from './actions';

const initialState = {
    counter: 0,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.INCREMENT:
            return { counter: state.counter + 1 };
            break;
        case actions.DECREMENT:
            return { counter: state.counter - 1 };
            break;
        default:
            return state;
            break;
    }
}
