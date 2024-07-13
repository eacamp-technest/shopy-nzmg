import {
  Button,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {SvgImage} from './SvgImages';
import {CommonStyles} from 'theme/common.styles';
import {Buttons} from './Buttons';

export interface IProduct {
  horizontal?: boolean;
  id: number;
  title?: string;
  price?: number;
  image?: string;
  size?: 's' | 'm' | 'l';
  isCounter?: boolean;
  isLiked?: boolean;
  category?: string;
  onPress?: () => void;
}

export const ProductCard: React.FC<IProduct> = ({
  id,
  horizontal,
  isLiked,
  isCounter,
  title,
  price,
  image,
  onPress,
  size = 'l',
  category,
}) => {
  const [counter, setCounter] = useState(0);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[horizontal && CommonStyles.row, styles.container]}>
      <Image style={[styles[size], styles.img]} source={{uri: image}} />
      <View>
        {title ? (
          <Text
            numberOfLines={1}
            style={[
              TypographyStyles.RegularTightSemiBold,
              size === 'l' && styles.title,
              {width: styles[size].width},
            ]}>
            {title}
          </Text>
        ) : null}
        <View style={[styles.isLiked, isCounter && styles.content]}>
          {isCounter ? (
            <View style={styles.counterContainer}>
              <Pressable
                onPress={() => setCounter(counter > 0 ? counter - 1 : 0)}>
                <SvgImage
                  color={colors.sky.base}
                  width={16}
                  height={16}
                  source={require('../assets/vectors/minus.svg')}
                />
              </Pressable>
              <Text style={styles.counter}>{counter}</Text>
              <Pressable onPress={() => setCounter(counter + 1)}>
                <SvgImage
                  color={colors.primary.base}
                  width={16}
                  height={16}
                  source={require('../assets/vectors/plus.svg')}
                />
              </Pressable>
            </View>
          ) : null}
          {price ? (
            <Text style={[styles.price, horizontal && {paddingTop: 8}]}>
              ${price}
            </Text>
          ) : null}
          {isLiked ? (
            <View style={styles.liked}>
              <Buttons
                style={styles.button}
                textColor={{color: colors.ink.base}}
                text="Move to Bag"
              />
              <SvgImage
                fill={colors.red.light}
                width={16}
                height={16}
                source={require('../assets/vectors/heart.svg')}
              />
            </View>
          ) : null}
        </View>
        {category ? <Text style={styles.link}>{category}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: normalize('vertical', 20),
    marginBottom: 24,
  },
  counterContainer: {
    ...CommonStyles.alignJustifyCenterRow,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 100,
    borderRadius: 8,
    height: 32,
    gap: normalize('horizontal', 18),
    backgroundColor: colors.sky.lightest,
    alignItems: 'flex-end',
  },
  counter: {
    ...TypographyStyles.RegularNoneBold,
    color: colors.ink.base,
  },
  liked: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
  },
  horizontal: {
    flexDirection: 'row',
  },
  img: {
    borderRadius: 8,
  },
  s: {
    width: 78,
    height: 78,
  },
  m: {
    width: 100,
    height: 100,
  },
  l: {
    width: 156,
    height: 141,
  },
  title: {
    ...TypographyStyles.RegularNoneSemiBold,
    color: colors.ink.base,
    paddingBottom: 8,
  },
  price: {
    ...TypographyStyles.TinyNormalBold,
    color: colors.ink.base,
  },
  link: {
    ...TypographyStyles.TinyNormalRegular,
    color: colors.ink.lighter,
    marginTop: 18,
  },
  content: {
    width: 229,
    ...CommonStyles.justifyBetweenRow,
    paddingTop: 26,
  },
  isLiked: {
    width: 180,
    gap: 24,
  },
  button: {
    ...TypographyStyles.RegularNoneRegular,
    backgroundColor: colors.sky.lightest,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
