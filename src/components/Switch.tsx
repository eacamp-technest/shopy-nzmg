import {View, StyleSheet, Pressable, ViewProps, StyleProp} from 'react-native';
import React, {useState} from 'react';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
type TSize = 'miniKnop' | 'material' | 'switch';
type TCircle = 'circle' | 'miniKnopCircle' | 'materialCircle';
type TRightCircle =
  | 'rightCircle'
  | 'rightMiniKnopCircle'
  | 'rightMaterialCircle';
interface ISwitch {
  size?: TSize;
  style?: StyleProp<ViewProps>;
  circleSize?: TCircle;
  rightCircles?: TRightCircle;
}
export const Switch: React.FC<ISwitch> = ({
  size = 'switch',
  style,
  circleSize = 'circle',
  rightCircles = 'rightCircle',
}) => {
  const [isSwitchOn, setSwitchOn] = useState(true);

  return (
    <View
      style={[styles.switch, styles[size], isSwitchOn && styles.right, style]}>
      <Pressable onPress={() => setSwitchOn(!isSwitchOn)}>
        <View
          style={[
            styles.circle,
            styles[circleSize],
            isSwitchOn && styles[rightCircles],
          ]}></View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: normalize('width', 56),
    height: normalize('height', 32),
    borderRadius: 32,
    backgroundColor: colors.sky.light,
  },
  right: {
    backgroundColor: colors.primary.base,
  },
  circle: {
    backgroundColor: colors.white,
    width: normalize('width', 28),
    height: normalize('height', 28),
    top: 2,
    marginHorizontal: normalize('horizontal', 2),
    borderRadius: 50,
  },
  rightCircle: {
    left: 26,
  },
  miniKnop: {
    width: normalize('width', 48),
    height: normalize('height', 24),
    top: 6,
    left: 6,
    borderRadius: 32,
  },

  miniKnopCircle: {
    width: normalize('width', 12),
    height: normalize('height', 12),
    top: 6,
    left: 6,
  },
  rightMiniKnopCircle: {
    left: 30,
  },

  material: {
    width: normalize('width', 36),
    height: normalize('height', 20),
  },
  materialCircle: {
    width: normalize('width', 20),
    height: normalize('height', 20),
    top: 0,
    left: 0,
  },

  rightMaterialCircle: {
    left: 16,
  },
});
