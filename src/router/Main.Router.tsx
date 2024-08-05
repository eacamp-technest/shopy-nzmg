import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import {
  searchScreenOptions,
  defaultScreenOptions,
} from 'configs/navigation.configs';
import { TabRouter } from './Tab.Router';
import { SearchScreen } from 'screens/settings/Search.Screens';
import { NavigationParamList } from 'types/navigation.types';
import { ProductDetailScreen } from 'screens/bookmark/ProductDetail.Screen';
import { PopularScreen } from 'screens/home/Popular.Screen';
import { MenList } from 'screens/itemList/Men.List';
import { WomenList } from 'screens/itemList/Women.List';
import { KidsList } from 'screens/itemList/Kids.List';
import { TeensList } from 'screens/itemList/Teens.List';
import { ItemListScreen } from 'screens/home/ItemList.Screen';
import { CartScreen } from 'screens/Cart.Screen';
import { FilterScreen } from 'screens/main/Filters.Screen';
import { ProductReviewScreen } from 'screens/bookmark/ProductReview.Screen';
import { AddAddressScreen } from 'screens/main/AddAddress.Screen';
import { Tester } from 'screens/payments/tester';
import { YourAddress } from 'screens/main/YourAddress';
import { ChooseCardScreen } from 'screens/home/ChooseCard.Screen';
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
      <MainStack.Screen
        name={Routes.itemlistScreen}
        component={ItemListScreen}
      />

      <MainStack.Screen name={Routes.cart} component={CartScreen} />
      <MainStack.Screen name={Routes.addAddress} component={AddAddressScreen} />
      <MainStack.Screen name={Routes.yourAddress} component={YourAddress} />
      <MainStack.Screen name={Routes.tester} component={Tester} />
      <MainStack.Screen name={Routes.chooseCard} component={ChooseCardScreen} />

      <MainStack.Screen name={Routes.menList} component={MenList} />
      <MainStack.Screen name={Routes.womenList} component={WomenList} />
      <MainStack.Screen name={Routes.kidslist} component={KidsList} />
      <MainStack.Screen name={Routes.teensList} component={TeensList} />
      <MainStack.Screen name={Routes.popular} component={PopularScreen} />
      <MainStack.Screen name={Routes.review} component={ProductReviewScreen} />
    </MainStack.Navigator>
  );
};
