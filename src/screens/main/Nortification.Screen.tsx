import {View, Text} from 'react-native';
import React from 'react';
import {useCustomStatusBar} from 'helpers/useCustomStatusBar';
import {colors} from 'theme/colors';

export const NortificationScreen = () => {
  useCustomStatusBar({backgroundColor: colors.white, barStyle: 'dark-content'});
  return (
    <View>
      <Text>NortificationScreen</Text>
    </View>
  );
};
