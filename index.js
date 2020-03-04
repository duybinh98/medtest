/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import HomeScreen from './components/HomeScreen'
import {name as appName} from './app.json';
// import LoginScreen from './components/LoginScreen';
// import ResetPassword from './components/ResetPasswordScreen';
// import RegisterScreen from './components/RegisterScreen';


import Navigator from './components/Navigator';
//
import store from './components/Store/store';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ContactForm from './components/Authentication/ContactForm';
import LoginForm from './components/Authentication/LoginScreen';

// const handleSubmit = values => {
//     alert(`Submitting form with values = ${values}`);
// }

export default class appForm extends Component {
    render(){
        return(
            <Provider store = {store}>
                <LoginForm/>
                {/* <ContactForm/> */}
            </Provider>
        );
    }
}


AppRegistry.registerComponent(appName, () => appForm);


