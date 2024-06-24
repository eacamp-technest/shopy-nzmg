import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Linking,
} from 'react-native';
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
import axios from 'axios';
import {Endpoints} from 'services/Endpoints';
import {useUserStoreActions} from 'store/user';
import {useToast} from 'store/toast';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.login>
> = ({navigation}) => {
  const {initUser} = useUserStoreActions();
  const showToast = useToast();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ILoginForm>({
    defaultValues: {
      email: __DEV__ ? 'emilys@gmail.com' : '',
      password: __DEV__ ? 'emilyspass' : '',
    },
  });
  const onSubmit = async (data: ILoginForm) => {
    console.log(data);

    const res = await axios({
      url: Endpoints.auth.login,
      method: 'POST',
      data: {
        username: data.email.replace('@gmail.com', ''),
        password: data.password,
      },
    });
    if (res.status === 200) {
      initUser(res.data);
      showToast('success', 'Login succesful');

      // navigation.navigate(Routes.verification, data);
    } else {
      showToast('error', 'Login failed');
    }
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
      <Navbar
        type="standard"
        leftActionType="icon"
        left={vectors.arrow_left}
        onLeftPress={navigation.goBack}
      />
      <Navbar type="large" title="Login!" />
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
          // rules={FormRules.password}
          type="password"
          placeholder="Enter your password"
        />
      </View>
      <View style={styles.footer}>
        <Buttons
          text="Login"
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
        <Text style={CommonStyles.alginSelfCenter}>or sign in with</Text>
        <View style={styles.social}>
          {Object.values(vectors).map(renderSocialButtons)}
        </View>
        <TextLink
          content="Don't have an account? Sign up"
          center
          highlighted={[
            {
              text: 'Sign up',
              callback: () => navigation.navigate(Routes.register),
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

const vectors = {
  arrow_left: {
    icon: require('../../assets/vectors/chevron-left.svg'),
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
    marginBottom: 12,
    flex: 1,
  },
});
