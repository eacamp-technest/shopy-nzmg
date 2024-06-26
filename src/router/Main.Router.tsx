import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from 'screens/main/Home.Screen';
import {Routes} from './routes';
import {DiscoverScreen} from 'screens/main/Discover.Screen';
import {BookmarkScreen} from 'screens/main/Bookmark.Screen';
import {SettingsScreen} from 'screens/main/Settings.Screen';
import {NortificationScreen} from 'screens/main/Nortification.Screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from 'theme/common.styles';
import {tabBarOption, tabBarScreenOptions} from 'configs/navigation.configs';

export const MainRouter = () => {
  const Main = createBottomTabNavigator();
  return (
    <SafeAreaView style={CommonStyles.flex}>
      <Main.Navigator
        screenOptions={tabBarScreenOptions}
        initialRouteName={Routes.home}>
        <Main.Screen
          options={tabBarOption[Routes.home]}
          name={Routes.home}
          component={HomeScreen}
        />
        <Main.Screen
          options={tabBarOption[Routes.discover]}
          name={Routes.discover}
          component={DiscoverScreen}
        />
        <Main.Screen
          options={tabBarOption[Routes.bookmark]}
          name={Routes.bookmark}
          component={BookmarkScreen}
        />
        <Main.Screen
          name={Routes.nortification}
          component={NortificationScreen}
          options={tabBarOption[Routes.nortification]}
        />
        <Main.Screen
          options={tabBarOption[Routes.settings]}
          name={Routes.settings}
          component={SettingsScreen}
        />
      </Main.Navigator>
    </SafeAreaView>
  );
};
