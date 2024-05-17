import {StyleSheet, Text, View, Keyboard, ScrollView} from 'react-native';
import React, {useRef} from 'react';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {TextLink} from 'components/TextLinks';
import {Buttons} from 'components/Buttons';
import {CommonStyles} from 'theme/common.styles';
import {vectors} from './Register.Screen';
import Modal, {IModalRefCallbacks} from 'components/Modal';
import {OtpCodeField} from 'components/OtpCodeField';
import {NavigationParamList} from 'types/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';

export const VerificationScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.login>
> = ({navigation}) => {
  const [code, setCode] = React.useState<string>('');
  const modalRef = useRef<IModalRefCallbacks>(null);
  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={CommonStyles.flex}>
      <Navbar
        type="standard"
        leftActionType="icon"
        onLeftPress={navigation.goBack}
        left={vectors.leftVector}
      />
      <Navbar type="large" title="Enter SMS Code" />
      <OtpCodeField
        setCode={setCode}
        code={code}
        style={styles.otp}
        triggerOnFinish={Keyboard.dismiss}
        length={4}
      />
      <View style={styles.footer}>
        <TextLink
          content="Didn't receive code? Resend Code"
          center
          highlighted={highlighted}
        />
        <Buttons onPress={() => modalRef?.current?.open()} text="Continue" />
      </View>
      <Modal
        subTitle={
          <TextLink content={modalContent} center highlighted={highlighted} />
        }
        closeable
        buttons={[
          {
            text: 'Agree and continue',
            types: 'primary',
            onPress: () => console.log('Agree and continue'),
          },
          {
            text: 'Disagree and close',
            types: 'transparent',
          },
        ]}
        wrapperStyle={{gap: 24}}
        ref={modalRef}
      />
    </ScrollView>
  );
};

const highlighted = [
  {
    text: 'Terms of Service and Conditions',
    callback: () => console.log('Terms of Service and Conditions '),
  },
];

const modalContent =
  'I agree to the Terms of Service and Conditions of Use including consent to electronic communications and I affirm that the information provided is my own.';

const modalHighlighted = [
  {
    text: 'Terms of Service and Conditinons',
    callback: () => console.log('Terms of Service and Conditions'),
  },
];

const styles = StyleSheet.create({
  otp: {
    paddingHorizontal: 32,
    marginBottom: 32,
    marginTop: 16,
  },
  footer: {
    gap: 32,
  },
  buttons: {
    gap: 12,
  },
});
