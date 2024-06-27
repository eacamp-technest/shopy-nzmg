import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {CommonStyles} from 'theme/common.styles';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';

interface ITables {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
  avatar?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}
export const Tables: React.FC<ITables> = ({
  title,
  subTitle,
  children,
  avatar,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.root, style]}>
      <View style={CommonStyles.row}>
        {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : null}
        <View style={{gap: 4}}>
          <Text
            style={[
              TypographyStyles.RegularTightRegular,
              styles.title,
              titleStyle,
            ]}>
            {title}
          </Text>
          <Text style={[TypographyStyles.SmallTightRegular, styles.subTitle]}>
            {subTitle}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    resizeMode: 'cover',
    marginRight: 12,
  },
  title: {
    color: colors.ink.darkest,
  },
  subTitle: {
    color: colors.ink.lighter,
  },
});
