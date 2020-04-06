import Promise from 'es6-promise';


const LOAD_PENDING = 'LOAD_PENDING';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_ERROR = 'LOAD_ERROR';

function setLoadPending(isLoadPending) {
    return {
        type: LOAD_PENDING,
        isLoadPending
    };
}
function setLoadSuccess(isLoadSuccess, customerInfor) {
    return {
        type: LOAD_SUCCESS,
        isLoadSuccess,
        customerInfor : customerInfor
    };
}
function setLoadError(LoadError) {
    return {
        type: LOAD_ERROR,
        LoadError
    };
}

function loadCustomerFromState(customerInfor) {
    return new Promise((resolve, reject) => {
        if (customerInfor !== null) {
            return resolve(true);
        } else {
            return reject(new Error('Load customer information failed'));
        }
    }); 
}


export function loadCustomerInfor(customerInfor){
    return dispatch => {
        dispatch(setLoadPending(true));
        // dispatch(setLoadSuccess(false,null));
        dispatch(setLoadError(null));
        // dispatch(setCustomerInfor(null));
        loadCustomerFromState(customerInfor)
        .then(success => {
            dispatch(setLoadPending(false));
            dispatch(setLoadSuccess(true,customerInfor))
        })
        .catch(err => {
            dispatch(setLoadPending(false));
            dispatch(setLoadError(err));
        })
    }
}

export default function reducer(state = {
    isLoadPending: false,
    isLoadSuccess: false,
    LoadError: null,
    customerInfor : null
}, action) {
    switch (action.type) {
        case LOAD_SUCCESS:
            return {
                ...state,
                isLoadSuccess: action.isLoadSuccess,
                customerInfor : action.customerInfor
            };
        case LOAD_PENDING:
            return {
                ...state,
                isLoadPending: action.isLoadPending
            };
        case LOAD_ERROR:
            return {
                ...state,
                LoadError: action.LoadError
            };
        default:
            return state;
    }
}

