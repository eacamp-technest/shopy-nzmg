import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgImage} from 'components/SvgImages';

export const LoginScreen = () => {
  return (
    <View>
      <Text>Login.Screen</Text>
      <SvgImage source={require('../../assets/vectors/logo.svg')} />
    </View>
  );
};

const styles = StyleSheet.create({});
