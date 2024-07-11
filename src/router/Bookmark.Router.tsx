import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from './routes';
import {NestedStackScreenOption} from 'configs/navigation.configs';
import {BookmarkScreen} from 'screens/main/Bookmark.Screen';
import {ProductDetailScreen} from 'screens/bookmark/ProductDetail.Screen';

const BookmarkStack = createNativeStackNavigator<NavigationParamList>();
export const BookmarkRouter = () => {
  return (
    <BookmarkStack.Navigator
      screenOptions={NestedStackScreenOption}
      initialRouteName={Routes.bookmark}>
      <BookmarkStack.Screen name={Routes.bookmark} component={BookmarkScreen} />
      <BookmarkStack.Screen
        name={Routes.productDetail}
        component={ProductDetailScreen}
      />
    </BookmarkStack.Navigator>
  );
};
