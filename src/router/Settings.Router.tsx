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
import {CheckEmailScreen} from 'screens/settings/CheckEmail.Screen';
import {NewPasswordScreen} from 'screens/settings/NewPassword.Screen';
import {ResetPasswordScreen} from 'screens/settings/ResetPassword.Screen';
import {MenList} from 'screens/itemList/Men.List';
import {WomenList} from 'screens/itemList/Women.List';
import {TeensList} from 'screens/itemList/Teens.List';
import {KidsList} from 'screens/itemList/Kids.List';

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
      <SettingsStack.Screen
        name={Routes.checkEmail}
        component={CheckEmailScreen}
      />
      <SettingsStack.Screen
        name={Routes.newPassword}
        component={NewPasswordScreen}
      />
      <SettingsStack.Screen
        name={Routes.resetPassword}
        component={ResetPasswordScreen}
      />

      <SettingsStack.Screen name={Routes.menList} component={MenList} />
      <SettingsStack.Screen name={Routes.womenList} component={WomenList} />
      <SettingsStack.Screen name={Routes.kidslist} component={KidsList} />
      <SettingsStack.Screen name={Routes.teensList} component={TeensList} />
      <SettingsStack.Screen name={Routes.scanner} component={ScannerScreen} />
    </SettingsStack.Navigator>
  );
};
