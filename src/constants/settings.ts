export interface ISettings {
  id: string;
  title: string;
  icon: string;
}

export const SETTINGS: ISettings[] = [
  {id: '1', title: 'Profile', icon: require('../assets/vectors/user.svg')},
  {
    id: '2',
    title: 'Order',
    icon: require('../assets/vectors/shopping-bag.svg'),
  },
  {
    id: '3',
    title: 'Address',
    icon: require('../assets/vectors/map-pin.svg'),
  },
  {
    id: '4',
    title: 'Payment',
    icon: require('../assets/vectors/shopping-cart.svg'),
  },
  {
    id: '5',
    title: 'Notification',
    icon: require('../assets/vectors/bell.svg'),
  },
  {id: '6', title: 'About', icon: require('../assets/vectors/info.svg')},
  {id: '7', title: 'Logout', icon: require('../assets/vectors/log-out.svg')},
];
