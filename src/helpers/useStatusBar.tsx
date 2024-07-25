import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from 'theme/colors';

type TStyle = 'light-content' | 'dark-content';

export const useStatusBar = (
  style: TStyle,
  backgroundColor: string = colors.white,
) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style);
      StatusBar.setBackgroundColor(backgroundColor);
    }, []),
  );
};
