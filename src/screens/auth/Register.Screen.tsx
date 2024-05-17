import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Navbar } from 'components/Navbar';
import { Buttons } from 'components/Buttons';
import { TextLink } from 'components/TextLinks';
import { normalize } from 'theme/metrics';
import { NavigationParamList } from 'types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from 'router/routes';
import { useForm } from 'react-hook-form'
import { InputControlled } from 'components/InputControlled'
import { FormRules } from 'constants/formRules'
import { CommonStyles } from 'theme/common.styles';
import { colors } from 'theme/colors';

interface IRegister {
  email: string;
  password: string;
  name?: string;
}

export const RegisterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.register>
> = ({ navigation }) => {
  const {
    control,
    formState: { errors },
  } = useForm<IRegister>();
  const navigateToWelcome = () => navigation.goBack();
  const navigateToVerification = () => navigation.navigate(Routes.verification);
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
      style={CommonStyles.flex}
      contentContainerStyle={CommonStyles.flex}
    >
      <Navbar
        type="standard"
        onLeftPress={navigateToWelcome}
        leftActionType="icon"
        left={vectors.leftVector}
      />
      <Navbar type="large" title="CREATE ACCOUNT" />
      <View style={styles.inputs}>
        <InputControlled
          control={control}
          name='name'
          label='Full Name'
          type='text'
          placeholder='Enter your name'
        />
        <InputControlled
          control={control}
          name='email'
          label='Email'
          errorMessage={errors.email?.message}
          rules={FormRules.email}
          type='text'
          keyboardType='email-address'
          placeholder='Enter your email'
        />
        <InputControlled
          control={control}
          name='password'
          label='Password'
          errorMessage={errors.password?.message}
          rules={FormRules.password}
          type='password'
          placeholder='Enter your password'
        />
      </View>
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
    </ScrollView >
  );
}

export const vectors = {
  leftVector: {
    icon: require('../../assets/vectors/chevron-left.svg'),
    color: colors.ink.base
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputs: {
    gap: 24
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: normalize('vertical', 32),
    gap: 194,
  },
});
