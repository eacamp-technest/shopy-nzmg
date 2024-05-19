import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Navbar} from 'components/Navbar';
import {TypographyStyles} from 'theme/typography';
import {TextLink} from 'components/TextLinks';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {Buttons} from 'components/Buttons';

export const PaymentMethodScreen = () => {
  return (
    <View style={styles.root}>
      <Navbar
        leftActionType="icon"
        left={require('../../assets/vectors/arrow-left.svg')}
        rightActionType="text"
        right={'Skip'}
      />
      <Navbar type="large" title="payment methods" />
      <View style={styles.container}>
        <Text style={TypographyStyles.RegularNormalSemiBold}>Stored Card</Text>
        <TextLink
          content="You have stored your card to make shopping with Shoppay even smoother. To enroll in Connected card, view card detail. Learn more"
          highlighted={[
            {
              text: 'Learn more',
              callback: () => console.log(),
            },
          ]}
        />
      </View>
      <View style={styles.navbars}>
        <Navbar
          style={styles.yourCard}
          leftActionType="icon-subText"
          left={{
            text: 'Mastercard * * * * 4 2 1 3',
            subText: 'Primary',
            icon: require('../../assets/vectors/brands.svg'),
          }}
          right={require('../../assets/vectors/chevron-right.svg')}
          rightActionType="icon"
        />
        <Navbar
          style={styles.addCard}
          leftActionType="icon-text"
          left={{
            icon: require('../../assets/vectors/plus-cicle.svg'),
            text: 'Add another card',
          }}
          rightActionType="icon"
          right={require('../../assets/vectors/chevron-right.svg')}
        />
      </View>
      <View style={styles.container}>
        <Text style={TypographyStyles.RegularNormalSemiBold}>Stored Card</Text>
        <Text style={[styles.text, TypographyStyles.RegularNormalRegular]}>
          You don’t have a connected bank account.
        </Text>
      </View>
      <Buttons text="Connect a bank account" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: normalize('horizontal', 12),
  },
  navbars: {
    gap: 16,
    paddingVertical: normalize('vertical', 8),
  },
  yourCard: {
    flex: 0,
  },
  addCard: {
    flex: 0.6,
    gap: 12,
  },
  text: {
    color: colors.ink.lighter,
  },
  container: {
    gap: 12,
    paddingVertical: normalize('vertical', 24),
  },
});
