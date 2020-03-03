/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import HomeScreen from './components/HomeScreen'
// import LoginScreen from './components/LoginScreen';
// import ResetPassword from './components/ResetPasswordScreen';
// import RegisterScreen from './components/RegisterScreen';
// import UpdateInformation from './components/UpdateInformation';
// import ChangePassword from './components/ChangePassword';
// import CustomerInformation from './components/CustomerInformation';
// import RequestPersionalInformation from './components/RequestPersionalInformation';
// import AppointmentDetailScreen from './components/AppointmentDetailScreen';

import Navigator from './components/Navigator';

AppRegistry.registerComponent(appName, () => Navigator);


