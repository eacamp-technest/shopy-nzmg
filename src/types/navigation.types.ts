import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Routes } from 'router/routes';
import { IModal } from 'components/Modal';
export type AppNavigation = NativeStackNavigationProp<NavigationParamList>;

interface ISearchProps extends NativeStackNavigationOptions {
  items?: string[] | null;
  onItemPress?: (item: string) => void;
}

export type NavigationParamList = {
  [Routes.authRouter]: {
    isAuth: boolean;
  };

  [Routes.mainRouter]: undefined;
  [Routes.welcome]: undefined;
  [Routes.login]: undefined;
  [Routes.register]: undefined;
  [Routes.verification]: {
    fullname?: string;
    email?: string;
    password?: string;
    verificationType: 'login' | 'register';
  };
  [Routes.modalScreen]: IModal;
  [Routes.paymentScreensTab]: undefined;
  [Routes.paymentMethod]: undefined;
  [Routes.addnewcard]: undefined;
  [Routes.createyourcard]: undefined;
  [Routes.yourCard]: undefined;
  [Routes.test]: undefined;
  [Routes.cart]: undefined;
  [Routes.home]: undefined;
  [Routes.bookmark]: undefined;
  [Routes.discover]: undefined;
  [Routes.bookmark]: undefined;
  [Routes.settings]: undefined;
  [Routes.nortification]: undefined;
  [Routes.search]: ISearchProps;
  [Routes.filters]: undefined;
  [Routes.tab]: undefined;
  [Routes.itemlist]: undefined;
  [Routes.womenList]: undefined;
  [Routes.discoverRouter]: undefined;
  [Routes.menList]: undefined;
  [Routes.kidslist]: undefined;
  [Routes.teensList]: undefined;
  [Routes.settingsNested]: undefined;
  [Routes.profile]: undefined;
  [Routes.order]: undefined;
  [Routes.scanner]: undefined;
  [Routes.success]: undefined;
  [Routes.reset]: undefined;
  [Routes.checkEmail]: undefined;
  [Routes.newPassword]: undefined;
  [Routes.resetPassword]: undefined;
  [Routes.productDetail]: undefined;
  [Routes.bookmarkRouter]: undefined;
  [Routes.popular]: undefined;
};
