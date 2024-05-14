import { StyleSheet, Text, View, Pressable, ScrollView, Linking } from 'react-native';
import React from 'react';
import { Navbar } from 'components/Navbar';
import { colors } from 'theme/colors';
import { TextLink } from 'components/TextLinks';
import { Buttons } from 'components/Buttons';
import { CommonStyles } from 'theme/common.styles';
import { useForm } from 'react-hook-form'
import { InputControlled } from 'components/InputControlled'
import { FormRules } from 'constants/formRules'
import { SvgImage } from 'components/SvgImages';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>();
  const onSubmit = (data: ILoginForm) =>
    new Promise(resolve => setTimeout(resolve, 2000))
  const renderSocialButtons = (icon: NodeRequire, index: number) => {
    if (index === 0) {
      return null
    }
    return (
      <Pressable key={index} onPress={() => Linking.openSettings()}>
        <SvgImage source={icon} />
      </Pressable>
    )
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
      style={CommonStyles.flex}
      contentContainerStyle={CommonStyles.flex}
    >
      <Navbar type='standard' leftActionType='icon' left={vectors.arrow_left} />
      <Navbar type='large' title='Welcome!' />
      <View style={styles.inputs}>
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
        <Buttons
          text='Create an account'
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        // disabled={!isValid}
        // onPress={() => onSubmit(email, password)}
        // disabled={errors.email || errors.password}
        />
        <Text style={[TypographyStyles.TinyNormalRegular, styles.option]}>or sign in with</Text>
        <View style={styles.social}>
          {Object.values(vectors).map(renderSocialButtons)}
        </View>
        <TextLink content='Already have an account?'
          center
          highlighted={highlighted} />
      </View>
    </ScrollView>
  );
};

const highlighted = [
  {
    text: 'Log in',
    callback: () => console.log('login')
  }
]
const vectors = {
  arrow_left: {
    icon: require('../../assets/vectors/chevron-left.svg'),
    color: colors.ink.base
  },
  google: require('../../assets/social/google.svg'),
  facebook: require('../../assets/social/facebook.svg'),
  x: require('../../assets/social/x.svg')
}

const styles = StyleSheet.create({
  inputs: {
    gap: 24
  },
  option: {
    textAlign: "center",
    color: colors.ink.dark
  },
  social: {
    flexDirection: "row",
    alignItems: 'flex-start',
    alignSelf: 'center',
    gap: 24,
    flex: 1
  },
  footer: {
    marginVertical: 32,
    gap: 32,
    flex: 1
  }
});
