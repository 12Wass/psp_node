import { useSelector, useDispatch } from "../../../store";
import * as actions from './actions';
import sdk from "./sdk";

function useUsers() {

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const methods = {

        getUsers: (cb) => sdk.getUsers().then(data => {
            if (data.success) {
                dispatch({ type: actions.GET_USERS_SUCCESS, payload: data.users });
                if (cb) cb(null, data.users);
            } else {
                if (cb) cb(data, null);
            }
        }).catch(err => {
            if (cb) cb(err, null);
        }),
        
    };
    
    return [users, methods];
}

export default useUsers;