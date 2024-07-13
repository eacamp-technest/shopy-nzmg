import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './routes';
import {
  searchScreenOptions,
  defaultScreenOptions,
} from 'configs/navigation.configs';
import {TabRouter} from './Tab.Router';
import {SearchScreen} from 'screens/settings/Search.Screens';
import {NavigationParamList} from 'types/navigation.types';
import {FilterScreen} from 'screens/main/Filters.Screen';
import {ProductDetailScreen} from 'screens/bookmark/ProductDetail.Screen';

const MainStack = createNativeStackNavigator<NavigationParamList>();
export const MainStackRouter = () => {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.tab}
      screenOptions={defaultScreenOptions}>
      <MainStack.Screen name={Routes.tab} component={TabRouter} />
      <MainStack.Screen
        options={searchScreenOptions}
        name={Routes.search}
        component={SearchScreen}
      />
      <MainStack.Screen name={Routes.filters} component={FilterScreen} />
      <MainStack.Screen
        name={Routes.productDetail}
        component={ProductDetailScreen}
      />
    </MainStack.Navigator>
  );
};
