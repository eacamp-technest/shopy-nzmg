import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {TypographyStyles} from 'theme/typography';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {CommonStyles} from 'theme/common.styles';
import {Buttons} from 'components/Buttons';
import {TextLink} from 'components/TextLinks';

export const CheckEmailScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.checkEmail>
> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Image
        style={[styles.image]}
        source={require('assets/images/checkEmail.png')}
      />
      <View style={styles.contain}>
        <Text style={[TypographyStyles.title3, CommonStyles.textAlignCenter]}>
          check your email
        </Text>
        <Text style={[TypographyStyles.RegularNormalRegular, styles.text]}>
          We have sent a password recover instructions to your email.
        </Text>
      </View>
      <Buttons
        text="Open email app"
        onPress={() => navigation.navigate(Routes.newPassword)}
        style={styles.button}
      />
      <Buttons text="Skip, I’ll confirm later" types="outlined" />
      <TextLink
        content="Did not receive the email? Check your spam filter, or try another email address"
        highlighted={[
          {
            text: 'try another email address',
            callback: () => navigation.navigate(Routes.reset),
          },
        ]}
        center
        style={styles.textLink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: normalize('horizontal', 24),
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
  },

  text: {
    ...CommonStyles.textAlignCenter,
    color: colors.ink.lighter,
  },
  contain: {
    gap: 8,
    paddingVertical: normalize('vertical', 32),
  },
  button: {
    marginBottom: 24,
  },
  textLink: {
    paddingHorizontal: normalize('horizontal', 10),
    marginTop: 80,
    paddingBottom: 16,
  },
});
