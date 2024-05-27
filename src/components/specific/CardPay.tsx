import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { Navbar } from '../Navbar';
import { colors } from 'theme/colors';
import { TypographyStyles } from 'theme/typography';
import { normalize } from 'theme/metrics';
import { CommonStyles } from 'theme/common.styles';
import { SvgImage } from 'components/SvgImages';

interface ICardPay {
  cardNumber?: string;
  cardHolder?: string;
  date?: string;
  empty?: boolean;
  style?: StyleProp<ViewStyle>
}

const TextGenerator = ({
  title,
  subtitle,
  isRight
}: {
  title: string;
  subtitle: string;
  isRight?: boolean
}) => (
  <View style={styles.generator}>
    <Text style={styles.name}>{title.toUpperCase()}</Text>
    <Text style={[styles.subtitle, isRight && { textAlign: 'right' }]}>{subtitle}</Text>
  </View>
)
export const CardPay: React.FC<ICardPay> = ({
  cardNumber,
  cardHolder = '',
  date = '',
  style,
  empty
}) => {
  return (

    <View style={[styles.root, empty && styles.empty, style]}>
      <View style={CommonStyles.alignCenterJustifyBetweenRow}>
        <Text style={styles.title}>UniversalCard</Text>
        <SvgImage source={require('../../assets/vectors/brands.svg')} color={colors.white} width={48} height={48} />
      </View>
      <Text style={styles.number}>{cardNumber}</Text>
      <View style={CommonStyles.alignCenterJustifyBetweenRow}>
        <TextGenerator title='card holder' subtitle={cardHolder} />
        <TextGenerator title='card save' subtitle={date} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.blue.base,
    borderRadius: 16,
    paddingHorizontal: normalize('horizontal', 24),
    paddingVertical: normalize('vertical', 16)
  },
  empty: {
    backgroundColor: 'rgba(3,3,3,0.4)'
  },
  title: {
    ...TypographyStyles.RegularTightSemiBold,
    color: colors.mellowApricot.lightest,

  },
  number: {
    ...TypographyStyles.title3,
    color: colors.mellowApricot.lightest,
    marginTop: normalize('vertical', 29),
    marginBottom: normalize('vertical', 16)
  },
  generator: {
    gap: normalize('vertical', 8)
  },
  name: {
    color: colors.mellowApricot.lightest,
    opacity: 0.5
  },
  subtitle: {
    ...TypographyStyles.Inter,
    color: colors.mellowApricot.additionColor,
  },
});