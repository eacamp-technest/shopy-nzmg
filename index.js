/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async messages => {
  console.log('Killed state notification', messages);
});
AppRegistry.registerComponent(appName, () => App);
