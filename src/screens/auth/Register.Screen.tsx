import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Navbar} from 'components/Navbar';
import {Buttons} from 'components/Buttons';
import {TextLink} from 'components/TextLinks';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';
import {useForm} from 'react-hook-form';
import {InputControlled} from 'components/InputControlled';
import {FormRules} from 'constants/formRules';
import {CommonStyles} from 'theme/common.styles';
import {colors} from 'theme/colors';
import {Endpoints} from 'services/Endpoints';
import axios from 'axios';
import {useToast} from 'store/toast';
import {useUserStore} from 'store/user/user.store';

export interface IRegister {
  fullName: string;
  password: string;
  email?: string;
  verificationType: 'register' | 'login';
}

export const RegisterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.register>
> = ({navigation}) => {
  const {navigatedToMain} = useUserStore(state => ({
    navigatedToMain: state.navigatedToMain,
  }));
  console.log('navigatedToMain:', navigatedToMain);
  const showToast = useToast();
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<IRegister>({
    defaultValues: {
      fullName: 'NGS Group',
      email: 'technest@gmail.com',
      password: 'qwe45678!',
    },
  });

  const onSubmit = async (data: IRegister) => {
    try {
      const res = await axios({
        url: Endpoints.auth.register,
        method: 'POST',
        data: {
          email: data.email,
          password: data.password,
          name: data.fullName,
        },
      });
      console.log({Rres: res.data});

      if (res.status === 201) {
        showToast('success', 'Registration successful');
        navigation.navigate(Routes.verification, {
          fullname: data.fullName,
          email: data.email,
          password: data.password,
          verificationType: 'register',
        });
      } else {
        showToast('error', 'Register failed');
      }
    } catch (error) {
      showToast('error', 'An error occurred');
      console.error('Error details', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    console.log('Component re-rendered with navigatedToMain:', navigatedToMain);
  }, [navigatedToMain]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
      style={CommonStyles.flex}
      contentContainerStyle={CommonStyles.flex}>
      <Navbar
        type="standard"
        onLeftPress={navigation.goBack}
        leftActionType="icon"
        left={vectors.leftVector}
      />
      <Navbar type="large" title="CREATE ACCOUNT" />
      <View style={styles.inputs}>
        <InputControlled
          control={control}
          name="fullName"
          label="Full Name"
          errorMessage={errors.fullName?.message}
          rules={FormRules.fullName}
          type="text"
          placeholder="Juinal William"
        />
        <InputControlled
          control={control}
          name="email"
          label="Email"
          errorMessage={errors.email?.message}
          rules={FormRules.email}
          type="text"
          keyboardType="email-address"
          placeholder="Enter your email"
        />
        <InputControlled
          control={control}
          name="password"
          label="Password"
          errorMessage={errors.password?.message}
          rules={FormRules.password}
          type="password"
          placeholder="Enter your password"
        />
      </View>
      <View style={styles.footer}>
        <Buttons
          text="Create an account"
          loading={isSubmitted}
          onPress={() => handleSubmit(onSubmit)()}
        />
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
    </ScrollView>
  );
};

const vectors = {
  leftVector: {
    icon: require('../../assets/vectors/chevron-left.svg'),
    color: colors.ink.base,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputs: {
    gap: 24,
  },
  footer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: normalize('vertical', 32),
  },
});
