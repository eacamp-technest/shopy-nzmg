import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from 'screens/main/Home.Screen';
import Router from 'router';
import {Routes} from './routes';
import {DiscoverScreen} from 'screens/main/Discover.Screen';
import {BookmarkScreen} from 'screens/main/Bookmark.Screen';
import {SettingsScreen} from 'screens/main/Settings.Screen';
import {NortificationScreen} from 'screens/main/Nortification.Screen';
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from 'theme/common.styles';
import {normalize} from 'theme/metrics';
import {SvgImage} from 'components/SvgImages';
import {colors} from 'theme/colors';

export const MainRouter = () => {
  const Main = createBottomTabNavigator();
  return (
    <SafeAreaView style={CommonStyles.flex}>
      <Main.Navigator
        screenOptions={{
          tabBarStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          headerShown: false,
          tabBarShowLabel: false,
        }}
        initialRouteName={Routes.home}>
        <Main.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <SvgImage
                color={focused ? colors.primary.base : colors.sky.dark}
                source={require('../assets/vectors/home.svg')}
              />
            ),
          }}
          name={Routes.home}
          component={HomeScreen}
        />
        <Main.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <SvgImage
                color={focused ? colors.primary.base : colors.sky.dark}
                source={require('../assets/vectors/search.svg')}
              />
            ),
          }}
          name={Routes.discover}
          component={DiscoverScreen}
        />
        <Main.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <SvgImage
                color={focused ? colors.primary.base : colors.sky.dark}
                source={require('../assets/vectors/heart.svg')}
              />
            ),
          }}
          name={Routes.bookmark}
          component={BookmarkScreen}
        />
        <Main.Screen
          name={Routes.nortification}
          component={NortificationScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <SvgImage
                color={focused ? colors.primary.base : colors.sky.dark}
                source={require('../assets/vectors/bell.svg')}
              />
            ),
          }}
        />
        <Main.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <SvgImage
                color={focused ? colors.primary.base : colors.sky.dark}
                source={require('../assets/vectors/align-justify.svg')}
              />
            ),
          }}
          name={Routes.settings}
          component={SettingsScreen}
        />
      </Main.Navigator>
    </SafeAreaView>
  );
};
