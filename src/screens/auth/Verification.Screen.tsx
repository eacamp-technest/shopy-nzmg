import { KeyboardAvoidingView, Platform, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Navbar } from '../../components/Navbar'
import { colors } from "theme/colors";
import { normalize } from "theme/metrics";
import { CommonStyles } from 'theme/common.styles';
import { TypographyStyles } from "theme/typography";

// import OTPInput from 'components/OTPInput';
// import {TextLink} from 'components/TextLinks';
// import {Buttons} from 'components/Buttons';
// import {normalize} from 'theme/metrics';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {NavigationParamList} from 'types/navigation.types';
// import {Routes} from 'router/routes';

export const VerificationScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.root}>
            <Navbar type="standard" leftActionType="icon" left={vectors.leftVector} />
            <Navbar type="large" title="Enter Sms Code" />
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "padding"}
                style={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <View>
                    <OTPInputView
                        pinCount={4}
                        autoFocusOnLoad
                        style={styles.otpInput}
                        codeInputFieldStyle={styles.inputText}
                        codeInputHighlightStyle={{
                            borderColor: colors.primary.base

                        }}
                        onCodeFilled={
                            (code) => {
                                console.log(`Code is ${code}`);

                            }
                        }
                    />
                    <View style={[CommonStyles.justifyBetweenRow, styles.resendMain]}>
                        <Text style={[TypographyStyles.SmallNormalRegular, styles.checkReceive]}>Didn't receive code?</Text>
                        <TouchableOpacity onPress={() => console.log("Resend code")}>
                            <Text style={[TypographyStyles.SmallNormalSemiBold, styles.resend]}>Resend</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => console.log("agree or go out")} style={styles.submitButton}>
                        <Text style={[TypographyStyles.RegularNoneSemiBold, styles.submitButtonText]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}
export const vectors = {
    leftVector: {
        icon: require('../../assets/vectors/chevron-left.svg'),
        color: colors.ink.base
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 24
    },
    otpInput: {
        width: "100%",
        height: 200,
        paddingHorizontal: normalize('horizontal', 32)
    },
    inputText: {
        width: 48,
        height: 48,
        color: colors.ink.base,
        borderWidth: 1,
        borderColor: colors.sky.light,
        borderRadius: 8,
        padding: 16,
        fontSize: normalize('font', 16),
        lineHeight: normalize("font", 16),
        fontFamily: "Montserrat-Bold"
    },
    submitButton: {
        backgroundColor: colors.sky.light,
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: normalize('vertical', 16),
        borderRadius: 8
    },
    submitButtonText: {
        color: colors.sky.dark,
    },
    resendMain: {
        width: '100%',
        marginVertical: normalize('vertical', 32),
        gap: 2
    },
    checkReceive: {
        color: colors.ink.lighter,
    },
    resend: {
        color: colors.primary.base,
    }
})

//second method 


// export const VerificationScreen: React.FC<
//   NativeStackScreenProps<NavigationParamList, Routes.verification>
// > = ({navigation}) => {
//   const goBack = () => navigation.goBack();
//   return (
//     <View style={styles.root}>
//       <Navbar
//         leftActionType="icon"
//         left={require('../../assets/vectors/left.svg')}
//         onLeftPress={goBack}
//       />
//       <Navbar type="large" title="ENTER SMS CODE" />
//       <View style={styles.container}>
//         <OTPInput />
//         <TextLink
//           content="Didn’t receive code? Resend Code"
//           center
//           highlighted={[
//             {text: 'Resend Code', callback: () => console.log('Resend Code')},
//           ]}
//         />
//         <Buttons text={'Continue'} onPress={() => console.log('Continue')} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     paddingHorizontal: normalize('horizontal', 12),
//   },
//   container: {
//     marginTop: 10,
//     gap: 33,
//   },
// });
