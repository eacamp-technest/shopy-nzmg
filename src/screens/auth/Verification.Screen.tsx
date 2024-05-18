import {StyleSheet,  View, Keyboard, ScrollView} from 'react-native';
import React from 'react';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {TextLink} from 'components/TextLinks';
import {Buttons} from 'components/Buttons';
import {CommonStyles} from 'theme/common.styles';
import {vectors} from './Register.Screen';
import {OtpCodeField} from 'components/OtpCodeField';
import {NavigationParamList} from 'types/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';

console.warn =(message:string)=>{
  if(message.includes('Non-serializable')){
    return
  }
}
export const VerificationScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.verification>
> = ({navigation}) => {
  const [code, setCode] = React.useState<string>('');
  const verify = () => {
   

    navigation.navigate(Routes.modalScreen, {
      title: 'What’s your team name',
      wrapperStyle: {gap: 24},
      buttons: [
        {
          text: 'Agree and continue',
          type: 'primary',
          onPress: () => navigation.navigate(Routes.paymentMethod),
        },
        {
          text: 'Disagree and close',
          type: 'transparent',
           onPress: navigation.goBack,
        },
      ],
      subTitle: (
        <TextLink
          content={modalContent}
          center
          highlighted={modalHighlighted}
        />
      ),
      onClose: () => {},
      closeable: true,
    });
  };

 
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
         <Buttons onPress={verify} text="Continue" disabled={code.length !== 4} />
      </View>
     
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
