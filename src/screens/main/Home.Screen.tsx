import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {Tables} from 'components/Tables';
import {Buttons} from 'components/Buttons';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';

export const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.bdazzleBlue.darkest}
      />
      <Navbar
        left={'CATEGORIES'}
        textStyle={{color: colors.ink.darkest}}
        leftActionType="text"
        rightActionType="text"
        right={'See All'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 0.33,
    backgroundColor: colors.bdazzleBlue.darkest,
    paddingHorizontal: normalize('horizontal', 24),
  },
});
