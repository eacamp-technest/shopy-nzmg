import {View, Text} from 'react-native';
import React from 'react';
import {useStatusBar} from 'helpers/useStatusBar';
import {colors} from 'theme/colors';

export const NortificationScreen = () => {
  useStatusBar('dark-content', colors.white);
  return (
    <View>
      <Text>NortificationScreen</Text>
    </View>
  );
};
