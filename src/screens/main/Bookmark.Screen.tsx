import {View, Text} from 'react-native';
import React from 'react';
import {useCustomStatusBar} from 'helpers/useCustomStatusBar';
import {colors} from 'theme/colors';

export const BookmarkScreen = () => {
  useCustomStatusBar({
    backgroundColor: colors.bdazzleBlue.darkest,
    barStyle: 'light-content',
  });
  return (
    <View>
      <Text>BookmarkScreen</Text>
    </View>
  );
};
