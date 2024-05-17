import {View, StyleSheet, Pressable, ScrollView, Linking} from 'react-native';
import React from 'react';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {TextLink} from 'components/TextLinks';
import {Buttons} from 'components/Buttons';
import {SvgImage} from 'components/SvgImages';
import {CommonStyles} from 'theme/common.styles';

import {useForm} from 'react-hook-form';
import {InputControlled} from 'components/InputControlled';
import {FormRules} from 'constants/formRules';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {ParamListBase} from '@react-navigation/native';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.login>
> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ILoginForm>({
    defaultValues: {
      email: __DEV__ ? 'tecnest@gmail.com' : '',
      password: __DEV__ ? 'qwe45678!' : '',
    },
  });
  const onSubmit = (data: any) => {
    navigation.navigate(Routes.verification, data);
  };

  const renderSocialButtons = (icon: NodeRequire, index: number) => {
    if (index === 0) {
      return null;
    }
    return (
      <Pressable key={index} onPress={() => Linking.openSettings()}>
        <SvgImage source={icon} />
      </Pressable>
    );
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
      style={CommonStyles.flex}
      contentContainerStyle={CommonStyles.flex}>
      <Navbar type="standard" leftActionType="icon" left={vectors.arrow_left} />
      <Navbar type="large" title="Welcome!" />
      <View style={styles.inputs}>
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
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
        <View style={styles.social}>
          {Object.values(vectors).map(renderSocialButtons)}
        </View>
        <TextLink
          content="By signing up you agree to our Terms and Conditions of Use"
          center
          highlighted={highlighted}
        />
      </View>
    </ScrollView>
  );
};

const highlighted = [
  {
    text: 'Terms',
    callback: () => console.log('terns'),
  },
  {
    text: 'Conditions of Use',
    callback: () => console.log('conditions'),
  },
];

const vectors = {
  arrow_left: {
    icon: require('../../assets/vectors/arrow-left (1).svg'),
    color: colors.ink.base,
  },
  google: require('../../assets/social/google.svg'),
  facebook: require('../../assets/social/facebook.svg'),
  x: require('../../assets/social/x.svg'),
};

const styles = StyleSheet.create({
  inputs: {
    gap: 24,
  },
  social: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    gap: 24,
    flex: 1,
  },
  footer: {
    marginTop: 32,
    gap: 32,
    flex: 1,
  },
});
