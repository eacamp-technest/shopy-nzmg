import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {SettingsScreen} from 'screens/main/Settings.Screen';
import {ProfileScreen} from 'screens/settings/Profile.Screen';
import {Routes} from './routes';
import {NestedStackScreenOption} from 'configs/navigation.configs';
import {OrderScreen} from 'screens/settings/Order.Screen';
import {ScannerScreen} from 'screens/settings/Scanner.Screen';
import {SuccessScreen} from 'screens/settings/Success.Screen';
import {ResetScreen} from 'screens/settings/Reset.Screen';

const SettingsStack = createNativeStackNavigator<NavigationParamList>();
export const SettingsRouter = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName={Routes.settings}
      screenOptions={NestedStackScreenOption}>
      <SettingsStack.Screen name={Routes.settings} component={SettingsScreen} />
      <SettingsStack.Screen name={Routes.profile} component={ProfileScreen} />
      <SettingsStack.Screen name={Routes.order} component={OrderScreen} />
      <SettingsStack.Screen name={Routes.success} component={SuccessScreen} />
      <SettingsStack.Screen name={Routes.reset} component={ResetScreen} />
      <SettingsStack.Screen name={Routes.scanner} component={ScannerScreen} />
    </SettingsStack.Navigator>
  );
};
