import {createStore , combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import initialValue from './Reducers/InitialValue'

const rootReducer = combineReducers({
    initialValue,
    form : formReducer
});
const store = createStore(rootReducer);
export default store;