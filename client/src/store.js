import React, { useContext, useState, useEffect } from 'react';
import { useReducer } from 'reinspect'
import combinedReducer from './reducers';

const StoreContext = React.createContext();

export const SESSION_STATE_KEY = 'app.state';

export const StoreProvider = ({ children }) => {
    // Init all states with memorized values
    const memoizedState = JSON.parse(localStorage.getItem(SESSION_STATE_KEY));

    const initialState = memoizedState ?  {...combinedReducer(undefined, {type: undefined}), ...memoizedState, } : combinedReducer(undefined, {type: undefined});
    // 
    const [state, dispatch] = useReducer(combinedReducer, initialState, () => initialState, 'store');
    //
    useEffect(() => {
        
        localStorage.setItem(SESSION_STATE_KEY, JSON.stringify(state));
        
    }, [ state ]);
    
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    );
};

/**
 * 
 * Create useSelector custom Hook
 */
export const useSelector = _function => {
    const [state, dispatch] = useContext(StoreContext);

    return _function(state);
};

/**
 * 
 * Create useDispatch custom Hook
 */
export const useDispatch = _function => {
    const [state, dispatch] = useContext(StoreContext);

    return dispatch;
};