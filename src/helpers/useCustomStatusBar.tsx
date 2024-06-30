import {StatusBar, Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

interface IStatusBar {
  backgroundColor: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
}

export const useCustomStatusBar = ({
  backgroundColor,
  barStyle = 'light-content',
}: IStatusBar) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(barStyle);
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(backgroundColor);
      }
      return () => {
        StatusBar.setBarStyle('default');
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('transparent');
        }
      };
    }, [backgroundColor, barStyle]),
  );
};
