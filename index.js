/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import HomeScreen from './components/HomeScreen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => HomeScreen);
