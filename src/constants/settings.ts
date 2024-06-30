import {Routes} from 'router/routes';

export interface ISettings {
  id: string;
  title: string;
  icon: NodeRequire;
  onPress: any;
}

export const SETTINGS: ISettings[] = [
  {
    id: '1',
    title: 'Profile',
    icon: require('../assets/vectors/user.svg'),
    onPress: Routes.profile,
  },
  {
    id: '2',
    title: 'Order',
    icon: require('../assets/vectors/shopping-bag.svg'),
    onPress: Routes.profile,
  },
  {
    id: '3',
    title: 'Address',
    icon: require('../assets/vectors/map-pin.svg'),
    onPress: Routes.profile,
  },
  {
    id: '4',
    title: 'Payment',
    icon: require('../assets/vectors/shopping-cart.svg'),
    onPress: Routes.profile,
  },
  {
    id: '5',
    title: 'Notification',
    icon: require('../assets/vectors/bell.svg'),
    onPress: Routes.profile,
  },
  {
    id: '6',
    title: 'About',
    icon: require('../assets/vectors/info.svg'),
    onPress: Routes.profile,
  },
  {
    id: '7',
    title: 'Logout',
    icon: require('../assets/vectors/log-out.svg'),
    onPress: Routes.profile,
  },
];
