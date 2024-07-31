import {ImageSourcePropType} from 'react-native';
import {Routes} from 'router/routes';
import {colors} from 'theme/colors';

interface IDiscover {
  id: number;
  title: string;
  image: ImageSourcePropType;
  background: string;
  onPress: any;
  placeholder?: ImageSourcePropType;
}

export const discover: IDiscover[] = [
  {
    id: 0,
    title: 'WOMEN',
    image: require('../assets/images/Image.png'),
    placeholder: require('assets/images/Placeholder.png'),
    background: colors.primary.base,
    onPress: Routes.womenList,
  },
  {
    id: 1,
    title: 'MEN',
    image: require('../assets/images/Image1.png'),
    placeholder: require('assets/images/Placeholder1.png'),

    background: colors.blue.base,
    onPress: Routes.menList,
  },
  {
    id: 2,
    title: 'KIDS',
    image: require('../assets/images/Image2.png'),
    placeholder: require('assets/images/Placeholder2.png'),
    background: colors.skyBlue.base,
    onPress: Routes.kidslist,
  },
  {
    id: 3,
    title: 'TEENS',
    image: require('../assets/images/Image3.png'),
    placeholder: require('assets/images/Placeholder3.png'),
    background: colors.lavender.base,
    onPress: Routes.teensList,
  },
];

export interface IGenderItem {
  id: string;
  title: string;
}
export const WOMEN: IGenderItem[] = [
  {id: '1', title: 'A-Line Dresses'},
  {id: '2', title: 'Active T-shirts'},
  {id: '3', title: 'Chiffon Tops'},
  {id: '4', title: 'Classic T-Shirt'},
  {id: '5', title: 'Essential T-Shirts'},
  {id: '6', title: 'Fitted Scoops'},
  {id: '7', title: 'Fitted T-Shirt'},
  {id: '8', title: 'Shoes'},
];

export const MEN: IGenderItem[] = [
  {id: '1', title: 'Long T-Shirts'},
  {id: '2', title: 'Premium T-Shirts'},
  {id: '3', title: 'Pullover Hoodies'},
  {id: '4', title: 'Pullovers'},
  {id: '5', title: 'Shoes'},
  {id: '6', title: 'Socks'},
  {id: '7', title: 'Unisex Tank Tops'},
  {id: '8', title: 'Zipped Hoodies'},
];

export const KIDS: IGenderItem[] = [
  {id: '1', title: 'Dresses'},
  {id: '2', title: 'Shirts & Blouses'},
  {id: '3', title: 'Tops'},
  {id: '4', title: 'Skirts'},
  {id: '5', title: 'Basics'},
  {id: '6', title: 'Shoes'},
  {id: '7', title: 'Accessories'},
  {id: '8', title: 'Premium Quality'},
];

export const TEENS: IGenderItem[] = [
  {id: '1', title: 'Tops'},
  {id: '2', title: 'Jackets'},
  {id: '3', title: 'Sportwear'},
  {id: '4', title: 'Swimwear'},
  {id: '5', title: 'Shoes'},
  {id: '6', title: 'Accessories'},
  {id: '7', title: 'Bags'},
  {id: '8', title: 'T-Shirts'},
];
