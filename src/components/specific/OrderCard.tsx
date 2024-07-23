import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Navbar} from 'components/Navbar';
import {IOrder} from 'constants/settings';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {Buttons} from 'components/Buttons';
import {normalize} from 'theme/metrics';

export const OrderCard: React.FC<IOrder> = ({
  orderNo,
  date,
  trackingNumber,
  quantiy,
  total,
  status,
}) => {
  return (
    <View style={styles.root}>
      {orderNo ? (
        <Navbar
          leftActionType="text"
          left={`Order No ${orderNo}`}
          leftTextStyle={[
            styles.rightText,
            TypographyStyles.RegularTightSemiBold,
          ]}
          rootStyle={styles.navbar}
          rightTextStyle={styles.leftText}
          rightActionType="text"
          right={date}
        />
      ) : null}
      <Navbar
        leftActionType="text"
        left={'Tracking Number'}
        leftTextStyle={styles.leftText}
        rightTextStyle={styles.rightText}
        rootStyle={styles.navbar}
        rightActionType="text"
        right={trackingNumber}
      />
      <Navbar
        leftActionType="text"
        left={'Quantiy'}
        leftTextStyle={styles.leftText}
        rootStyle={styles.navbar}
        rightTextStyle={styles.rightText}
        rightActionType="text"
        right={quantiy}
      />
      <Navbar
        leftActionType="text"
        left={'Total Amount'}
        leftTextStyle={styles.leftText}
        rightTextStyle={styles.rightText}
        rootStyle={styles.navbar}
        rightActionType="text"
        right={total}
      />
      <Navbar
        leftActionType="text"
        left={'Status'}
        leftTextStyle={styles.leftText}
        rightTextStyle={styles.status}
        rootStyle={styles.navbar}
        rightActionType="text"
        right={status}
      />
      <Buttons style={styles.button} text="Details" types="outlined" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  navbar: {
    paddingVertical: normalize('vertical', 6),
  },
  leftText: {
    ...TypographyStyles.SmallNormalRegular,
    color: colors.ink.lighter,
  },
  rightText: {
    ...TypographyStyles.TinyNoneSemiBold,
    color: colors.ink.base,
  },
  status: {
    ...TypographyStyles.TinyNoneRegular,
    color: colors.lavender.base,
    backgroundColor: colors.lavender.lightest,
    borderRadius: 10,
    paddingHorizontal: normalize('horizontal', 12),
    paddingVertical: normalize('vertical', 4),
  },
  button: {marginVertical: normalize('vertical', 18)},
});
