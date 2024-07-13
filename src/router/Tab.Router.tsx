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
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator<NavigationParamList>();

export const TabRouter: React.FC = () => {
  const shownTabRoutes: Routes[] = [
    Routes.home,
    Routes.discover,
    Routes.bookmark,
    Routes.nortification,
    Routes.settings,
  ];
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const routeKey = routeName as keyof typeof Routes;
        const displayTabBar = shownTabRoutes.includes(Routes[routeKey]);
        return {
          ...tabBarScreenOptions,
          tabBarStyle: {
            display: displayTabBar || routeName === undefined ? 'flex' : 'none',
          },
        };
      }}
      initialRouteName={Routes.home}>
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
