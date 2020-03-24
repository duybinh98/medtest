import {createStore , combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import initialValue from './Reducers/InitialValue'
import login from './Reducers/LoginReducer'

const rootReducer = combineReducers({
    login,
    initialValue,
    form : formReducer
});
const store = createStore(rootReducer, {}, applyMiddleware(thunk,logger));
export default store;