import { KeyboardAvoidingView, Platform, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Navbar } from '../../components/Navbar'
import { colors } from "theme/colors";
import { normalize } from "theme/metrics";
import { CommonStyles } from 'theme/common.styles';
import { TypographyStyles } from "theme/typography";

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
                        codeInputFieldStyle={{
                            width: 48,
                            height: 48,
                            color: colors.ink.base,
                            fontWeight: '700',
                            borderWidth: 1,
                            borderColor: colors.sky.light,
                            borderRadius: 8,
                            padding: 16
                        }}
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
const vectors = {
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