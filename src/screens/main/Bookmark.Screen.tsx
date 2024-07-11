import {View, Text} from 'react-native';
import React from 'react';
import {useCustomStatusBar} from 'helpers/useCustomStatusBar';
import {colors} from 'theme/colors';
import ProductDetails from 'components/ProductDetails';
export const BookmarkScreen = () => {
  useCustomStatusBar({
    backgroundColor: colors.bdazzleBlue.darkest,
    barStyle: 'light-content',
  });
  return (
    <View>
     
    </View>
  );
};
