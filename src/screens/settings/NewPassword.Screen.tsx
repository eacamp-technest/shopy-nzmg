import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Navbar} from 'components/Navbar';
import {TypographyStyles} from 'theme/typography';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {Input} from 'components/Input';
import {Buttons} from 'components/Buttons';

export const NewPasswordScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.newPassword>
> = ({navigation}) => {
  const [password, setPassword] = useState('*****************');
  return (
    <View style={styles.root}>
      <Navbar
        mode="light"
        leftActionType="icon"
        left={require('assets/vectors/left.svg')}
      />
      <Text style={styles.title}>create new password</Text>
      <Text style={styles.text}>
        Your new password must be different from previous used passwords.
      </Text>
      <View style={styles.contain}>
        <Input
          value={password}
          setValue={setPassword}
          caption="Must be at least 12 characters"
          label="Password"
        />
        <Input
          value={password}
          setValue={setPassword}
          caption="Both passwords must match"
          label="Confirm Password"
        />
      </View>
      <Buttons text="Reset password" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  title: {
    ...TypographyStyles.title2,
    paddingVertical: normalize('vertical', 16),
  },
  text: {
    ...TypographyStyles.RegularNoneRegular,
    color: colors.ink.lighter,
    paddingRight: 20,
    paddingTop: 8,
  },
  contain: {
    gap: 24,
    paddingVertical: normalize('vertical', 32),
  },
});
