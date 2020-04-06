import Promise from 'es6-promise';
import { getApiUrl } from './../../Common/CommonFunction'


const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT_PENDING = 'LOGOUT_PENDING';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_ERROR = 'LOGOUT_ERROR'

function setLoginPending(isLoginPending) {
    return {
        type: LOGIN_PENDING,
        isLoginPending
    };
}
function setLoginSuccess(isLoginSuccess, setToken, setCustomerInfo) {
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess,
        setToken,
        setCustomerInfo
    };
}
function setLoginError(LoginError) {
    return {
        type: LOGIN_ERROR,
        LoginError
    };
}
function setLogoutError(LogoutError) {
    return {
        type: LOGOUT_ERROR,
        LogoutError
    };
}
function setLogoutPending(isLogoutPending) {
    return {
        type: LOGOUT_PENDING,
        isLogoutPending,
    }
}
function setLogoutSuccess(isLoginSuccess, setToken, setCustomerInfo) {
    return {
        type: LOGOUT_SUCCESS,
        isLoginSuccess,
        setToken,
        setCustomerInfo
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
                dispatch(setLoginSuccess(true, success.token, success.customerInfo));

            })
            .catch(error => {
                dispatch(setLoginPending(false));
                dispatch(setLoginError(error));
            })
    }
}
export function logout() {
    return dispatch => {
        dispatch(setLogoutPending(true));
        dispatch(setLogoutError(null));
        sendLogoutRequest()
            .then(success => {
                dispatch(setLogoutPending(false));
                dispatch(setLogoutSuccess(false, null, null));
            })
            .catch(error => {
                dispatch(setLogoutPending(false));
                dispatch(setLogoutError(error));
            })
    }
}

export default function reducer(state = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLogoutPending: false,
    Error: null,
    token: null,
    customerInfo: null,
}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess,
                token: action.setToken,
                customerInfo: action.setCustomerInfo
            };
        case LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending
            };
        case LOGIN_ERROR:
            return {
                ...state,
                Error: action.LoginError
            };
        case LOGOUT_PENDING:
            return {
                ...state,
                isLogoutPending: action.isLogoutPending,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess,
                token: action.setToken,
                customerInfo: action.setCustomerInfo
            }
        case LOGOUT_ERROR:
            return {
                ...state,
                Error: action.LOGOUT_ERROR
            }
        default:
            return state;
    }
}
function sendLoginRequest(phoneNumber, password) {
    return new Promise((resolve, reject) => {

        fetch(getApiUrl() + '/users/customers/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                password: password,
                role : "CUSTOMER"
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.message) {
                        alert(result.message)
                        return reject(new Error(result.message));
                    } else {
                        const token = result.token;
                        const customerInfo = result.customerInfo;
                        return resolve({ token, customerInfo });
                    }
                },
                (error) => {
                    return reject(new Error(error));
                }
            );
    });
}
function sendLogoutRequest() {
    return new Promise((resolve, reject) => {
        // if (customerInfo !== null) {
        //     Console.log("Logout success")
            return resolve(true);
        // } else {
            // Console.log("Logout error")
            // return reject(new Error('Logout failed'));
        // }
    });
}