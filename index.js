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



AppRegistry.registerComponent(appName, () => ResetPassword);


