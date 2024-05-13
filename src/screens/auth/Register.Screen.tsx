import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Navbar } from 'components/Navbar';
import { Buttons } from 'components/Buttons';
import { TextLink } from 'components/TextLinks';
import { normalize } from 'theme/metrics';
import { NavigationParamList } from 'types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from 'router/routes';
import { vectors } from './Verification.Screen';

export const RegisterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.register>
> = ({ navigation }) => {
  const navigateToWelcome = () => navigation.goBack();
  const navigateToVerification = () => navigation.navigate(Routes.verification);
  return (
    <View style={styles.root}>
      <Navbar

        type="standard"
        onLeftPress={navigateToWelcome}
        leftActionType="icon"
        left={vectors.leftVector}
      />
      <Navbar type="large" title="CREATE ACCOUNT" />
      <View style={styles.footer}>
        <Buttons text="Create an account" onPress={navigateToVerification} />
        <TextLink
          content="By signing up you agree to our Terms and Conditions of Use"
          center
          highlighted={[
            {
              text: 'Terms',
              callback: () => console.log('terms'),
            },
            {
              text: 'Conditions of Use',
              callback: () => console.log('conditions of use'),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: normalize('horizontal', 12),
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: normalize('vertical', 32),
    gap: 194,
  },
});