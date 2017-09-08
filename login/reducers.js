import * as actions from './actions';

export default function login(state = {}, action) {
    switch (action.type) {
        case actions.START_LOGIN:
            return state;
        case actions.LOGIN_SUCCESS:
            return state;
        case actions.LOGIN_FAILED:
            return state;
        default:
            return state;
    }
}
