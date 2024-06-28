import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import React, {ReactNode} from 'react';
import {CommonStyles} from 'theme/common.styles';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {SvgImage} from './SvgImages';
interface ITables {
  title?: string;
  subTitle?: string;
  onPress?: () => void;
  Left?: ReactNode;
  Right?: ReactNode;
  key?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}
export const Tables: React.FC<ITables> = ({
  title,
  subTitle,
  Left,
  onPress,
  Right,
  style,
  key,
  titleStyle,
}) => {
  return (
    <Pressable key={key} onPress={onPress} style={[styles.root, style]}>
      <View style={[CommonStyles.row, styles.contain]}>
        {Left}
        <View style={styles.text}>
          <Text
            style={[
              TypographyStyles.RegularTightRegular,
              styles.title,
              titleStyle,
            ]}>
            {title}
          </Text>
          {subTitle ? (
            <Text style={[TypographyStyles.SmallTightRegular, styles.subTitle]}>
              {subTitle}
            </Text>
          ) : null}
        </View>
      </View>
      {Right}
    </Pressable>
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
  contain: {
    gap: 8,
    ...CommonStyles.alignJustifyCenter,
  },
  text: {gap: 4},
});
