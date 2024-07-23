import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from './routes';
import {DiscoverScreen} from 'screens/main/Discover.Screen';
import {
  NestedStackScreenOption,
  searchScreenOptions,
} from 'configs/navigation.configs';
import {WomenList} from 'screens/itemList/Women.List';
import {MenList} from 'screens/itemList/Men.List';
import {TeensList} from 'screens/itemList/Teens.List';
import {KidsList} from 'screens/itemList/Kids.List';
import {SearchScreen} from 'screens/settings/Search.Screens';

const DiscoverStack = createNativeStackNavigator<NavigationParamList>();
export const DiscoverRouter = () => {
  return (
    <DiscoverStack.Navigator
      screenOptions={NestedStackScreenOption}
      initialRouteName={Routes.discover}>
      <DiscoverStack.Screen name={Routes.discover} component={DiscoverScreen} />
      <DiscoverStack.Screen
        options={searchScreenOptions}
        name={Routes.search}
        component={SearchScreen}
      />
      <DiscoverStack.Screen name={Routes.womenList} component={WomenList} />
      <DiscoverStack.Screen name={Routes.menList} component={MenList} />
      <DiscoverStack.Screen name={Routes.kidslist} component={KidsList} />
      <DiscoverStack.Screen name={Routes.teensList} component={TeensList} />
    </DiscoverStack.Navigator>
  );
};
