import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CardPay} from 'components/CardPay';
import {Navbar} from 'components/Navbar';
import {Buttons} from 'components/Buttons';

export const YourCardScreen = () => {
  return (
    <View style={styles.root}>
      <Navbar
        rootStyle={styles.navbar}
        leftActionType="icon"
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
