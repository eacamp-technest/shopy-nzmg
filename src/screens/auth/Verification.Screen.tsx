import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import OTPInput from 'components/OTPInput';
import {Navbar} from 'components/Navbar';
import {TextLink} from 'components/TextLinks';
import {Buttons} from 'components/Buttons';
import {normalize} from 'theme/metrics';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';

export const VerificationScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.verification>
> = ({navigation}) => {
  const goBack = () => navigation.goBack();
  return (
    <View style={styles.root}>
      <Navbar
        leftActionType="icon"
        left={require('../../assets/vectors/left.svg')}
        onLeftPress={goBack}
      />
      <Navbar type="large" title="ENTER SMS CODE" />
      <View style={styles.container}>
        <OTPInput />
        <TextLink
          content="Didn’t receive code? Resend Code"
          center
          highlighted={[
            {text: 'Resend Code', callback: () => console.log('Resend Code')},
          ]}
        />
        <Buttons text={'Continue'} onPress={() => console.log('Continue')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: normalize('horizontal', 12),
  },
  container: {
    marginTop: 10,
    gap: 33,
  },
});
