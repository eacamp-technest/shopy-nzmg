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

export interface IProfile {
  id: string;
  title: string;
  subTitle: string;
  icon: NodeRequire;
  right: NodeRequire;
}

export const PROFILE: IProfile[] = [
  {
    id: '1',
    title: 'Email',
    subTitle: 'brooklyn@studioalva.co',
    icon: require('../assets/vectors/mail.svg'),
    right: require('../assets/vectors/chevron-right.svg'),
  },
  {
    id: '2',
    title: 'Birthday',
    subTitle: '25-11-1997',
    icon: require('../assets/vectors/calendar.svg'),
    right: require('../assets/vectors/chevron-right.svg'),
  },
  {
    id: '3',
    title: 'Phone Number',
    subTitle: '(+62) 857 40388 373',
    icon: require('../assets/vectors/smartphone.svg'),
    right: require('../assets/vectors/chevron-right.svg'),
  },
  {
    id: '4',
    title: 'Change Password',
    subTitle: '*****************',
    icon: require('../assets/vectors/lock'),
    right: require('../assets/vectors/chevron-right.svg'),
  },
];
