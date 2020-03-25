import Promise from 'es6-promise';
// import actions from "redux-form/lib/actions"
// import action from '../Action/actions';

const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

function setLoginPending(isLoginPending) {
    return {
        type: LOGIN_PENDING,
        isLoginPending
    };
}
function setLoginSuccess(isLoginSuccess, token) {
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess,
        token
    };
}
function setLoginError(LoginError) {
    return {
        type: LOGIN_ERROR,
        LoginError
    };
}
export function login(phonenumber, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));
        sendLoginRequest(phonenumber, password)
        .then(success => {
            dispatch(setLoginPending(false));
            dispatch(setLoginSuccess(true,success ));
        })
        .catch(err => {
            dispatch(setLoginPending(false));
            dispatch(setLoginError(err));
        })
    }
    
}

export default function reducer(state = {
    isLoginPending: false,
    isLoginSuccess: false,
    LoginError: null,
    token : null,
}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess,
                token : action.token
            };
        case LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending
            };
        case LOGIN_ERROR:
            return {
                ...state,
                LoginError: action.LoginError
            };
        default:
            return state;
    }
}

function sendLoginRequest(phoneNumber, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (phoneNumber === '0123456789' && password === '123456') {
                // return resolve("123456");
                return resolve("123456");
            } else {
                return reject(new Error('Invalid email or password'));
            }   
        },1000)

    });
}