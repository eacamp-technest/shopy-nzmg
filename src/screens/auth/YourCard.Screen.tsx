import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CardPay} from 'components/CardPay';
import {Navbar} from 'components/Navbar';
import {Buttons} from 'components/Buttons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';

export const YourCardScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.yourCard>
> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Navbar
        rootStyle={styles.navbar}
        leftActionType="icon"
        onLeftPress={navigation.goBack}
        left={require('../../assets/vectors/chevron-left.svg')}
        title="YOUR CARD"
      />
      <CardPay
        text="Universal Card"
        userName="Brooklyn Simmons"
        cardSave="12/24"
        cardNumber={'4532 1245 8765 2156'}
      />
      <Buttons text="Add new card" types={'outlined'} />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    gap: 32,
  },
  navbar: {
    paddingBottom: 2,
  },
});
