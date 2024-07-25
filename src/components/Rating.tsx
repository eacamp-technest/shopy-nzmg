import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SvgImage } from './SvgImages';
import { colors } from 'theme/colors';
import { CommonStyles } from 'theme/common.styles';

interface RatingProps {
  rating: number;
  numberOfRates?: number;
  size?: number;
  style?: StyleProp<ViewStyle>;
  starStyle?: StyleProp<ViewStyle>;
  fixRating?: boolean;
  rateLength?: number;
  onRateChange?: (rateLength: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  rating = 0,
  numberOfRates = 0,
  size = 16,
  style,
  starStyle,
  fixRating = false,
  rateLength,
  onRateChange,
}) => {
  const totalStars = 5;
  const [hoveredStars, setHoveredStars] = useState<number>(-1);
  const [fixedRating, setFixedRating] = useState<number>(rating);

  const handlePressIn = (index: number) => {
    setHoveredStars(index);
    if (onRateChange) {
      onRateChange(index + 1);
    }
  };

  const handlePressOut = (index: number) => {
    setFixedRating(index + 1);
    setHoveredStars(-1);
  };

  return (
    <View style={[CommonStyles.alignCenterRow, style]}>
      <View style={[CommonStyles.alignCenterRow, starStyle]}>
        {Array(totalStars)
          .fill(0)
          .map((_, index) => (
            <Pressable
              key={index}
              onPressIn={() => (!fixRating ? handlePressIn(index) : null)}
              onPressOut={() => (!fixRating ? handlePressOut(index) : null)}>
              <SvgImage
                fill={
                  index <=
                    (hoveredStars !== -1 ? hoveredStars : fixedRating - 1)
                    ? colors.yellow.base
                    : colors.sky.light
                }
                width={size}
                height={size}
                source={require('../assets/vectors/star.svg')}
              />
            </Pressable>
          ))}
      </View>
      {numberOfRates ? (
        <Text style={styles.text}>({numberOfRates})</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 8,
    color: colors.sky.dark,
  },
});
