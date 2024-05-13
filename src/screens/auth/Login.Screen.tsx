import { StyleSheet, Text, View, Pressable, ScrollView, Linking } from 'react-native';
import React from 'react';
import { Navbar } from 'components/Navbar';
import { colors } from 'theme/colors';
import { TextLink } from 'components/TextLinks';
import { Buttons } from 'components/Buttons';
import SvgImage from 'react-native-svg/lib/typescript/elements/Image';
import { CommonStyles } from 'theme/common.styles';
import { useForm } from 'react-hook-form'
import { InputControlled } from 'components/InputControlled'
import { FormRules } from 'constants/formRules'


export const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
};
