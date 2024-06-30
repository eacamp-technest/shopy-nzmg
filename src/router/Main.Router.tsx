import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from 'screens/main/Home.Screen';
import {Routes} from './routes';
import {BookmarkScreen} from 'screens/main/Bookmark.Screen';
import {SettingsScreen} from 'screens/main/Settings.Screen';
import {NortificationScreen} from 'screens/main/Nortification.Screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from 'theme/common.styles';
import {tabBarOption, tabBarScreenOptions} from 'configs/navigation.configs';
import {DiscoverRouter} from './Discover.Router';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {SettingsRouter} from './Settings.Router';

export const MainRouter = () => {
  const Main = createBottomTabNavigator();
  const shownTabRoutes: Routes[] = [
    Routes.home,
    Routes.discover,
    Routes.bookmark,
    Routes.nortification,
    Routes.settings,
  ];
  return (
    <SafeAreaView style={CommonStyles.flex}>
      <Main.Navigator
        screenOptions={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          const routeKey = routeName as keyof typeof Routes;
          const displayTabBar = shownTabRoutes.includes(Routes[routeKey]);
          return {
            ...tabBarScreenOptions,
            tabBarStyle: {
              display:
                displayTabBar || routeName === undefined ? 'flex' : 'none',
            },
          };
        }}
        initialRouteName={Routes.home}>
        <Main.Screen
          options={tabBarOption[Routes.home]}
          name={Routes.home}
          component={HomeScreen}
        />
        <Main.Screen
          options={tabBarOption[Routes.discover]}
          name={Routes.discoverNested}
          component={DiscoverRouter}
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
          name={Routes.settingsNested}
          component={SettingsRouter}
        />
      </Main.Navigator>
    </SafeAreaView>
  );
};
