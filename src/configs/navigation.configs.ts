import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import { normalize } from '../theme/metrics';

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
};

export const authStackScreenOption: NativeStackNavigationOptions = {
  ...defaultScreenOptions,
  contentStyle: {
    backgroundColor: 'white',
    paddingHorizontal: normalize('horizontal', 24),
  },
};