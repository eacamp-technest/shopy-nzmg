<<<<<<< HEAD
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';
import { IModal } from 'components/Modal'
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
  [Routes.modalScreen]:IModal
  [Routes.paymentMethod]: undefined;
  [Routes.test]: undefined;
};
=======
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Routes } from 'router/routes'
import { IModal } from 'components/Modal'
export type AppNavigation = NativeStackNavigationProp<NavigationParamList>

export type NavigationParamList = {
    [Routes.authRouter]: {
        isAuth: boolean
    }
    [Routes.mainRouter]: undefined
    [Routes.welcome]: undefined
    [Routes.login]: undefined
    [Routes.register]: undefined
    [Routes.verification]:{
        email:string;
        password:string;
    }
    [Routes.modalScreen]:IModal
    [Routes.paymentMethod]: undefined
    [Routes.test]: undefined
}
>>>>>>> modalScreen
