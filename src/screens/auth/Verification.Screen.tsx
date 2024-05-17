import {View, StyleSheet, Keyboard, ScrollView} from 'react-native';
import React, {useRef} from 'react';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {OtpCodeField} from 'components/OtpCodeField';
import {TextLink} from 'components/TextLinks';
import {Buttons} from 'components/Buttons';
import {CommonStyles} from 'theme/common.styles';
import Modal, {IModalRefCallbacks} from 'components/Modal';

export const VerificationScreen: React.FC = () => {
  const [code, setCode] = React.useState<string>('');
  const modalRef = useRef<IModalRefCallbacks>(null);

  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={CommonStyles.flex}>
      <Navbar type="standard" leftActionType="icon" left={vectors.arrowLeft} />
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
          content="Didn’t receive code? Resend Code"
          center
          highlighted={highlighted}
        />
        <Buttons onPress={() => modalRef?.current?.open()} text="Continue" />
      </View>
      <Modal
        title="What’s your team name"
        // imageSize="large"
        // source={require('../../assets/images/x.png')}
        subTitle={
          <TextLink
            content={modalContent}
            center
            highlighted={modalHighlighted}
          />
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
      {/* <TextLink
          content={modalContent}
          center
          highlighted={modalHighlighted}
        />
        <View style={styles.buttons}>
          <Buttons text="Agree and continue" />
          <Buttons text="Disagree and close" type="transparent" />
        </View> */}
    </ScrollView>
  );
};

const modalContent =
  'I agree to the Terms of Service and Conditions of Use including consent to electronic communications and I affirm that the information provided is my own.';

const modalHighlighted = [
  {
    text: 'Terms of Service and Conditions',
    callback: () => console.log('Terms of Service and Conditions'),
  },
];

const highlighted = [
  {
    text: 'Resend Code',
    callback: () => console.log('Resend Code'),
  },
];

export const vectors = {
  arrowLeft: {
    icon: require('../../assets/vectors/arrow-left (1).svg'),
    color: colors.ink.darkest,
  },
};

const styles = StyleSheet.create({
  otp: {
    paddingHorizontal: 32,
    marginTop: 16,
    marginBottom: 32,
  },
  footer: {
    gap: 32,
  },
  buttons: {
    gap: 12,
  },
});
