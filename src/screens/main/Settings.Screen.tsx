import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {Tables} from 'components/Tables';
import {Buttons} from 'components/Buttons';
import {SvgImage} from 'components/SvgImages';
import {SvgAst} from 'react-native-svg';

export const SettingsScreen = () => {
  return (
    <SafeAreaProvider>
      <Navbar
        titleColor={colors.ink.base}
        title="Settings"
        leftActionType="icon"
        mode="light"
        left={require('../../assets/vectors/left.svg')}
      />
      <Navbar
        leftActionType="icon-text"
        mode="light"
        left={{text: 'Profile', icon: require('../../assets/vectors/user.svg')}}
      />
      <Tables
        onPress={() => console.log('Profile')}
        Left={
          <SvgImage
            source={require('../../assets/vectors/user.svg')}
            color={colors.primary.base}
          />
        }
        title="Profile"
        Right={
          <SvgImage
            source={require('../../assets/vectors/chevron-right.svg')}
            color={colors.sky.dark}
          />
        }
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});
