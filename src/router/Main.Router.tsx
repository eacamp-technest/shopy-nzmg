import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './routes';
// import {NavigationParamList} from 'types/navigation.types';
import { TestScreen } from '../screens/Test.Screen';
import { NavigationParamList } from '../types/navigation.types';

const MainStack = createNativeStackNavigator<NavigationParamList>();

export const MainRouter = () => {
  return (
    <MainStack.Navigator initialRouteName={Routes.test}>
      <MainStack.Screen name={Routes.test} component={TestScreen} />
    </MainStack.Navigator>
  );
};