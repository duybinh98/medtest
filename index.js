/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import HomeScreen from './components/HomeScreen'
import {name as appName} from './app.json';
import LoginScreen from './components/LoginScreen';
import ResetPassword from './components/ResetPasswordScreen';
import RegisterScreen from './components/RegisterScreen';
import Navigator from './components/Navigator';

import UpdateInformation from './components/UpdateInformation';
import ChangePassword from './components/ChangePassword';
import CustomerInformation from './components/CustomerInformation';
import RequestPersionalInformation from './components/RequestPersionalInformation';
import AppointmentDetailScreen from './components/AppointmentDetailScreen';


AppRegistry.registerComponent(appName, () => AppointmentDetailScreen);


