import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {SettingsScreen} from 'screens/main/Settings.Screen';
import {ProfileScreen} from 'screens/settings/Profile.Screen';
import {Routes} from './routes';
import {NestedStackScreenOption} from 'configs/navigation.configs';

const SettingsStack = createNativeStackNavigator<NavigationParamList>();
export const SettingsRouter = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName={Routes.settings}
      screenOptions={NestedStackScreenOption}>
      <SettingsStack.Screen name={Routes.settings} component={SettingsScreen} />
      <SettingsStack.Screen name={Routes.profile} component={ProfileScreen} />
    </SettingsStack.Navigator>
  );
};
