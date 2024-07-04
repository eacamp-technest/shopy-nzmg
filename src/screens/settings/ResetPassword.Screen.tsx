import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Buttons} from 'components/Buttons';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {CommonStyles} from 'theme/common.styles';

export const ResetPasswordScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.resetPassword>
> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        source={require('assets/images/resetPassword.png')}
      />
      <View style={styles.contain}>
        <Text style={[CommonStyles.textAlignCenter, TypographyStyles.title3]}>
          password reset
        </Text>
        <Text style={[styles.text, TypographyStyles.RegularNormalRegular]}>
          Your password has been reset successfully
        </Text>
      </View>
      <Buttons text="Continue shopping" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  contain: {
    paddingVertical: normalize('vertical', 32),
    gap: 8,
  },
  text: {
    color: colors.ink.lighter,
    paddingHorizontal: normalize('horizontal', 40),
    ...CommonStyles.textAlignCenter,
  },
});
