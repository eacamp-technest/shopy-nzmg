import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {SvgImage} from 'components/SvgImages';
import {Routes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
  contentStyle: {
    backgroundColor: colors.white,
  },
};

export const authStackScreenOption: NativeStackNavigationOptions = {
  ...defaultScreenOptions,
  contentStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: normalize('horizontal', 24),
  },
};
export const tabBarScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: colors.primary.base,
  tabBarInactiveTintColor: colors.sky.dark,
};
export const modalScreenOptions: NativeStackNavigationOptions = {
  ...defaultScreenOptions,
  presentation: 'transparentModal',
  animation: 'fade_from_bottom',
  contentStyle: {
    backgroundColor: 'transparent',
  },
};
const tabIconConfig: {[key: string]: NodeRequire} = {
  [Routes.home]: require('../assets/vectors/home.svg'),
  [Routes.discover]: require('../assets/vectors/search.svg'),
  [Routes.bookmark]: require('../assets/vectors/heart.svg'),
  [Routes.nortification]: require('../assets/vectors/bell.svg'),
  [Routes.settings]: require('../assets/vectors/settings.svg'),
};

const renderTabIcon =
  (routeName: Routes) =>
  ({color}: {color: string}) => {
    return (
      <SvgImage
        source={tabIconConfig[routeName]}
        width={24}
        height={24}
        color={color}
      />
    );
  };

export const tabBarOption = {
  [Routes.home]: {
    tabBarIcon: renderTabIcon(Routes.home),
  },
  [Routes.discover]: {
    tabBarIcon: renderTabIcon(Routes.discover),
  },
  [Routes.bookmark]: {
    tabBarIcon: renderTabIcon(Routes.bookmark),
  },
  [Routes.nortification]: {
    tabBarIcon: renderTabIcon(Routes.nortification),
  },
  [Routes.settings]: {
    tabBarIcon: renderTabIcon(Routes.settings),
  },
};
