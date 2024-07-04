import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';
import {IModal} from 'components/Modal';
export type AppNavigation = NativeStackNavigationProp<NavigationParamList>;

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
  [Routes.home]: undefined;
  [Routes.itemlist]: undefined;
  [Routes.discover]: undefined;
  [Routes.settings]: undefined;
  [Routes.discoverNested]: undefined;
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
};
