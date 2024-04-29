import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from '../router/routes';

export type AppNavigation = NativeStackNavigationProp<NavigationParamList>;

export type NavigationParamList = {
  [Routes.authRouter]: {
    isAuth: boolean;
  };
  [Routes.mainRouter]: undefined;
  [Routes.welcome]: undefined;
  [Routes.login]: undefined;
  [Routes.register]: undefined;
  [Routes.verification]: undefined;
  [Routes.paymentMethod]: undefined;
  [Routes.test]: undefined;
};