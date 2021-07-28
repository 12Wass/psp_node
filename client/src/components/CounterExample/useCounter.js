import { useSelector, useDispatch } from "../../store";
import * as actions from './actions';

export function useCounter() {

    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const methods = {
        increment: () => dispatch({ type: actions.INCREMENT }),
        decrement: () => dispatch({ type: actions.DECREMENT }),
    }

    return [ counter, methods ];
    
}