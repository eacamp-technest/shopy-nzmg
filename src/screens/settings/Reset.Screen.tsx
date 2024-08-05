import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Navbar} from 'components/Navbar';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {Input} from 'components/Input';
import {Buttons} from 'components/Buttons';
import {useStatusBar} from 'helpers/useStatusBar';

export const ResetScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.reset>
> = ({navigation}) => {
  const [email, setEmail] = useState<string>('brooklyn@nucleus.co');
  useStatusBar('dark-content', colors.white);

  return (
    <View style={styles.root}>
      <Navbar
        leftActionType="icon"
        mode="light"
        onLeftPress={() => navigation.goBack()}
        left={require('assets/vectors/left.svg')}
      />
      <Text style={styles.title}>RESET PASSWORD</Text>
      <Text style={styles.text}>
        Enter the email associated with your account and we’ll send an email
        with instructions to reset your password.
      </Text>
      <Input
        value={email}
        setValue={setEmail}
        style={styles.input}
        label="Email address"
      />
      <Buttons
        text="Send instructions"
        onPress={() => {
          navigation.pop();
          navigation.navigate(Routes.checkEmail);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  title: {
    ...TypographyStyles.title2,
    color: colors.ink.base,
    paddingVertical: normalize('vertical', 16),
  },
  text: {
    ...TypographyStyles.RegularNoneRegular,
    color: colors.ink.lighter,
    paddingTop: 8,
  },
  input: {
    paddingVertical: normalize('vertical', 32),
  },
});
