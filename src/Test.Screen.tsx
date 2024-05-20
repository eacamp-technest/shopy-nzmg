import {CardPay} from 'components/CardPay';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Navbar} from 'components/Navbar';
import {FormRules} from 'constants/formRules';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {InputControlled} from 'components/InputControlled';
import {Routes} from 'router/routes';
import {colors} from 'theme/colors';
import {useForm} from 'react-hook-form';

export const TestScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.test>
> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Text>Salam Aleikum</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'green',
  },
});
