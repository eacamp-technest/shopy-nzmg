import {View, Text, StyleSheet, Linking} from 'react-native';
import React from 'react';
import {Navbar} from 'components/Navbar';
import {SvgImage} from 'components/SvgImages';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';
import {Buttons} from 'components/Buttons';
import {CommonStyles} from 'theme/common.styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';

export const AboutScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.about>
> = ({navigation}) => {
  const handlePressGoogle = () => {
    Linking.openURL('https://www.google.com');
  };
  const handlePressFacebook = () => {
    Linking.openURL('https://www.facebook.com');
  };
  const handlePressX = () => {
    Linking.openURL('https://www.x.com');
  };
  return (
    <View style={styles.root}>
      <Navbar
        mode="light"
        leftActionType="icon"
        left={require('assets/vectors/left.svg')}
        title="ABOUT"
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.contain}>
        <View style={styles.logo}>
          <SvgImage
            color={colors.white}
            height={100}
            width={100}
            source={require('assets/vectors/logo.svg')}
          />
        </View>
        <Text style={TypographyStyles.SmallNoneRegular}>
          Shoppay is a comprehensive e-commerce application designed to provide
          a seamless shopping experience. The app offers a user-friendly
          interface and a variety of features to enhance the online shopping
          journey, from browsing products to finalizing payments.
        </Text>
        <Buttons
          position="right"
          icon={require('assets/social/google.svg')}
          text="Google"
          types="outlined"
          onPress={handlePressGoogle}
        />
        <Buttons
          position="right"
          types="outlined"
          icon={require('assets/social/facebook.svg')}
          text="Facebook"
          onPress={handlePressFacebook}
        />
        <Buttons
          position="right"
          types="outlined"
          icon={require('assets/social/x.svg')}
          text="Twitter"
          onPress={handlePressX}
        />
        <Text style={CommonStyles.alginSelfCenter}>Version 0.0.1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    gap: 60,
  },
  logo: {
    backgroundColor: colors.primary.base,
    alignSelf: 'center',
    borderRadius: 100,
    padding: 10,
  },
  contain: {
    gap: 20,
  },
});
