import Promise from 'es6-promise';
import {getApiUrl} from './../../Common/CommonFunction'
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


export function login(phonenumber, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));
        sendLoginRequest(phonenumber, password)
        .then(success => {
            dispatch(setLoginSuccess(true,success.token,success.customerInfo));
            dispatch(setLoginPending(false));
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
    customerInfo: null,
}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess,
                token : action.setToken,
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
                LoginError: action.LoginError
            };
        default:
            return state;
    }
}

function sendLoginRequest(phoneNumber, password) {
    return new Promise((resolve, reject) => {    

    fetch(getApiUrl()+'/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
            password: password,
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                // const _result = JSON.stringify(result);
                // console.dir(result);
                const token=result.token;
                const customerInfo = result.customerInfo;
                return resolve({token,customerInfo});
            },
            (error) => {
                return reject(new Error(error));
            }
        );
           
// fetch(getApiUrl()+"/users/customers/detail/1")
//         .then(res => res.json())
//         .then(
//             (result) => {
//                 const token='12345';
//                 const customerInfo = result;
//                 return resolve({token,customerInfo});
//             },            
//             (error) => {
//                 return reject(new Error(error));
//             }
//         ) 
//          return reject(new Error('Invalid email or password'));
        
    });
}