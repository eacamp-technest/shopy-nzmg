import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';
import {normalize} from 'theme/metrics';

interface ICategory {
  item: string;
  selectedCategory: string | null;
  backgroundColor: string;
  setSelectedCategory: (category: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function Category({
  item,
  selectedCategory,
  setSelectedCategory,
  backgroundColor,
  style,
}: ICategory) {
  return (
    <TouchableOpacity
      style={[styles.main]}
      onPress={() => setSelectedCategory(item)}>
      <Text
        style={[
          styles.categoryText,
          style,
          selectedCategory === item && {
            color: colors.white,
            backgroundColor: backgroundColor,
          },
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryText: {
    ...TypographyStyles.RegularNoneRegular,
    backgroundColor: colors.sky.lightest,
    color: colors.ink.base,
    paddingVertical: normalize('vertical', 8),
    paddingHorizontal: 16,
    textAlign: 'center',
    borderRadius: 16,
    marginHorizontal: 8,
  },
  main: {
    marginBottom: 20,
  },
});
