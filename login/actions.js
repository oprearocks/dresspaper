export const START_LOGIN = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function startLogin() {
    return {
        type: START_LOGIN,
    };
}

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user,
    };
}

export function loginFailed(reason) {
    return {
        type: LOGIN_FAILED,
        reason
    };
}
