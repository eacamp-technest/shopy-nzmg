import {StyleSheet, TextStyle} from 'react-native';
import {colors} from './colors';
import {normalize} from './metrics';

export const bebasFonts = {
  700: 'BebasNeue',
};

export const montserratFonts = {
  400: 'Montserrat-Regular',
  600: 'Montserrat-SemiBold',
  700: 'Montserrat-Bold',
};
const fontSize12 = normalize('font', 12);
const fontSize14 = normalize('font', 14);
const fontSize16 = normalize('font', 16);
const fontSize18 = normalize('font', 18);
const fontSize24 = normalize('font', 24);
const fontSize32 = normalize('font', 32);
const fontSize46 = normalize('font', 46);

// const lineHeight12 = fontSize12
// const lineHeight14 = fontSize14
// const lineHeight16 = fontSize16
// const lineHeight18 = fontSize18
// const lineHeight20 = normalize('font', 20)
// const lineHeight24 = fontSize24
// const lineHeight32 = fontSize32
// const lineHeight36 = normalize('font', 36)
// const lineHeight56 = normalize('font', 56)

const commonFontStyling: TextStyle = {
  includeFontPadding: false,
  padding: 0,
  color: colors.ink.darkest,
};

export const TypographyStyles = StyleSheet.create({
  title1: {
    fontSize: fontSize46,
    fontFamily: bebasFonts[700],
    ...commonFontStyling,
  },
  title2: {
    fontSize: fontSize32,
    fontFamily: bebasFonts[700],
    ...commonFontStyling,
  },
  title3: {
    fontSize: fontSize24,
    fontFamily: bebasFonts[700],
    ...commonFontStyling,
  },
  LargeNoneBold: {
    fontSize: fontSize18,
    // lineHeight: lineHeight18,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  LargeNoneSemilBold: {
    fontSize: fontSize18,
    // lineHeight: lineHeight18,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  LargeNoneRegular: {
    fontSize: fontSize18,
    // lineHeight: lineHeight18,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  LargeTightBold: {
    fontSize: fontSize18,
    // lineHeight: lineHeight20,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  LargeTightSemiBold: {
    fontSize: fontSize18,
    // lineHeight: lineHeight20,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  LargeTightRegular: {
    fontSize: fontSize18,
    // lineHeight: lineHeight20,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  LargeNormalBold: {
    fontSize: fontSize18,
    // lineHeight: lineHeight24,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  LargeNormalSemiBold: {
    fontSize: fontSize18,
    // lineHeight: lineHeight24,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  LargeNormalRegular: {
    fontSize: fontSize18,
    // lineHeight: lineHeight24,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  RegularNoneBold: {
    fontSize: fontSize16,
    // lineHeight: lineHeight16,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  RegularNoneSemiBold: {
    fontSize: fontSize16,
    // lineHeight: lineHeight16,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  RegularNoneRegular: {
    fontSize: fontSize16,
    // lineHeight: lineHeight16,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  RegularTightBold: {
    fontSize: fontSize16,
    // lineHeight: lineHeight20,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  RegularTightSemiBold: {
    fontSize: fontSize16,
    // lineHeight: lineHeight20,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  RegularTightRegular: {
    fontSize: fontSize16,
    // lineHeight: lineHeight20,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  RegularNormalBold: {
    fontSize: fontSize16,
    // lineHeight: lineHeight24,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  RegularNormalSemiBold: {
    fontSize: fontSize16,
    // lineHeight: lineHeight24,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  RegularNormalRegular: {
    fontSize: fontSize16,
    // lineHeight: lineHeight24,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  SmallNoneBold: {
    fontSize: fontSize14,
    // lineHeight: lineHeight14,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  SmallNoneSemiBold: {
    fontSize: fontSize14,
    // lineHeight: lineHeight14,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  SmallNoneRegular: {
    fontSize: fontSize14,
    // lineHeight: lineHeight14,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  SmallTightBold: {
    fontSize: fontSize14,
    // lineHeight: lineHeight16,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  SmallTightSemiBold: {
    fontSize: fontSize14,
    // lineHeight: lineHeight16,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  SmallTightRegular: {
    fontSize: fontSize14,
    // lineHeight: lineHeight16,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  SmallNormalBold: {
    fontSize: fontSize14,
    // lineHeight: lineHeight20,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  SmallNormalSemiBold: {
    fontSize: fontSize14,
    // lineHeight: lineHeight20,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  SmallNormalRegular: {
    fontSize: fontSize14,
    // lineHeight: lineHeight20,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  TinyNoneBold: {
    fontSize: fontSize12,
    // lineHeight: lineHeight12,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  TinyNoneSemiBold: {
    fontSize: fontSize12,
    // lineHeight: lineHeight12,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  TinyNoneRegular: {
    fontSize: fontSize12,
    // lineHeight: lineHeight12,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  TinyTightBold: {
    fontSize: fontSize12,
    // lineHeight: lineHeight14,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  TinyTightSemibold: {
    fontSize: fontSize12,
    // lineHeight: lineHeight14,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  TinyTightRegular: {
    fontSize: fontSize12,
    // lineHeight: lineHeight14,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  TinyNormalBold: {
    fontSize: fontSize12,
    // lineHeight: lineHeight16,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  TinyNormalSemiBold: {
    fontSize: fontSize12,
    // lineHeight: lineHeight16,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  TinyNormalRegular: {
    fontSize: fontSize12,
    // lineHeight: lineHeight16,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
});
