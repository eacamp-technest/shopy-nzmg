import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TypographyStyles } from 'theme/typography';
import { colors } from 'theme/colors';
import { normalize } from 'theme/metrics';
import { SvgImage } from './SvgImages';
import { CommonStyles } from 'theme/common.styles';
import { Buttons } from './Buttons';
import { useCartStore } from 'store/cart/cart.store';

export interface IProduct {
  horizontal?: boolean;
  id: number;
  title?: string;
  price: number;
  image?: string;
  size?: 's' | 'm' | 'l';
  isCounter?: boolean;
  isLiked?: boolean;
  category?: string;
  quantity?: number;
  rating?: {
    rate?: number;
    count?: number;
  }
  onPress?: () => void;
  onBinPress?: () => void;
}

export const ProductCard: React.FC<IProduct> = ({
  id,
  horizontal,
  isLiked,
  isCounter,
  title,
  price,
  rating,
  image,
  size = 'l',
  category,
  quantity = 1,
  onPress,
  onBinPress
}) => {
  const [counter, setCounter] = useState(1);
  const { actions: { updateItemQuantity } } = useCartStore();

  useEffect(() => {
    updateItemQuantity(id, counter);
  }, [counter]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[horizontal && CommonStyles.row, styles.container]}>
      <Image style={[styles[size], styles.img]} source={{ uri: image }} />
      <View>
        {title ? (
          <Text
            numberOfLines={1}
            style={[
              TypographyStyles.RegularTightSemiBold,
              styles.title,
              { width: styles['l'].width },
            ]}>
            {title}
          </Text>
        ) : null}
        <View style={[styles.isLiked, isCounter && styles.content]}>
          {isCounter ? (
            <View style={{ width: '50%', gap: 20, flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.counterContainer}>
                <Pressable
                  onPress={() => setCounter(counter > 1 ? counter - 1 : 1)}>
                  <SvgImage
                    color={colors.sky.base}
                    width={16}
                    height={16}
                    source={require('../assets/vectors/minus.svg')}
                    onPress={onBinPress}
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
              <Pressable onPress={onBinPress} style={{ zIndex: 2 }}>
                <SvgImage
                  color={colors.ink.lighter}
                  width={26}
                  height={24}
                  source={require('../assets/vectors/trash-2.svg')}
                />
              </Pressable>
            </View>
          ) : null}
          {price ? (
            <Text style={[styles.price, horizontal && { paddingTop: 8 }]}>
              ${price * counter}
            </Text>
          ) : null}
          {isLiked ? (
            <View style={styles.liked}>
              <Buttons
                style={styles.button}
                textColor={{ color: colors.ink.base }}
                text="Move to Bag"
              />
              <SvgImage
                fill={colors.red.light}
                width={26}
                height={24}
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
    gap: 54,
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
    width: 200,
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
