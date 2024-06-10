import { View, Text, Image, StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';
import { CommonStyles } from 'theme/common.styles';
import { TypographyStyles } from 'theme/typography';
import { colors } from 'theme/colors';

interface ITables {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
  avatar?: string;
}
export const Tables: React.FC<ITables> = ({
  title,
  subTitle,
  children,
  avatar,
}) => {
  return (
    <View style={[CommonStyles.alignCenterJustifyBetweenRow, styles.root]}>
      <View style={CommonStyles.row}>
        {avatar ? <Image style={styles.image} source={{ uri: avatar }} /> : null}
        <View style={{ gap: 4 }}>
          <Text style={[TypographyStyles.RegularTightRegular, styles.title]}>
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
