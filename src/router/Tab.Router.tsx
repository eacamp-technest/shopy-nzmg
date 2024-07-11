import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabBarOption, tabBarScreenOptions} from 'configs/navigation.configs';
import React from 'react';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from './routes';
import {HomeScreen} from 'screens/main/Home.Screen';
import {DiscoverScreen} from 'screens/main/Discover.Screen';
import {BookmarkScreen} from 'screens/main/Bookmark.Screen';
import {NortificationScreen} from 'screens/main/Nortification.Screen';
import {SettingsScreen} from 'screens/main/Settings.Screen';
import {DiscoverRouter} from './Discover.Router';
import {SettingsRouter} from './Settings.Router';
import {BookmarkRouter} from './Bookmark.Router';

const Tab = createBottomTabNavigator<NavigationParamList>();

export const TabRouter: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={tabBarScreenOptions}>
      <Tab.Screen
        name={Routes.home}
        component={HomeScreen}
        options={tabBarOption[Routes.home]}
      />
      <Tab.Screen
        name={Routes.discoverRouter}
        component={DiscoverRouter}
        options={tabBarOption[Routes.discover]}
      />
      <Tab.Screen
        options={tabBarOption[Routes.bookmark]}
        name={Routes.bookmarkRouter}
        component={BookmarkRouter}
      />
      <Tab.Screen
        name={Routes.nortification}
        component={NortificationScreen}
        options={tabBarOption[Routes.nortification]}
      />
      <Tab.Screen
        options={tabBarOption[Routes.settings]}
        name={Routes.settingsNested}
        component={SettingsRouter}
      />
    </Tab.Navigator>
  );
};
