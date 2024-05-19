import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Navbar} from './Navbar';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';
import {normalize} from 'theme/metrics';
interface ICardPay {
  text?: string;
  cardNumber?: string;
  userName?: string;
  cardSave?: string;
  onPress?: () => void;
}
export const CardPay: React.FC<ICardPay> = ({
  text,
  cardNumber,
  userName,
  cardSave,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Navbar
        textStyle={styles.text}
        leftActionType="text"
        left={text}
        rightActionType="icon"
        right={require('../assets/vectors/brands.svg')}
      />
      <Text style={styles.cardNumber}>{cardNumber}</Text>
      <View style={styles.container}>
        <Navbar
          type="large"
          rootStyle={styles.navbar}
          textStyle={styles.text}
          leftActionType="text"
          left="card holder"
          rightActionType="text"
          right="card save"
        />
        <Navbar
          rootStyle={styles.navbar}
          style={styles.navbarSide}
          textStyle={styles.text}
          leftActionType="text"
          left={userName}
          rightActionType="text"
          right={cardSave}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.blue.base,
    borderRadius: 16,
    paddingHorizontal: normalize('horizontal', 24),
  },
  text: {
    ...TypographyStyles.RegularTightSemiBold,
    color: colors.mellowApricot.lightest,
  },
  cardNumber: {
    ...TypographyStyles.title3,
    color: colors.mellowApricot.lightest,
    paddingTop: 29,
    paddingBottom: 16,
  },
  container: {
    paddingBottom: 24,
  },
  navbar: {
    paddingVertical: 0,
  },
  navbarSide: {
    flex: 0.8,
  },
});
