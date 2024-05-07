import {View, StyleSheet, Pressable, ViewProps, StyleProp} from 'react-native';
import React, {useState} from 'react';
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
    width: 56,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#DADADC',
  },
  right: {
    backgroundColor: '#DE6053',
  },
  circle: {
    backgroundColor: '#ffffff',
    width: 28,
    height: 28,
    top: 2,
    left: 2,
    borderRadius: 50,
  },
  rightCircle: {
    left: 26,
  },
  miniKnop: {
    width: 48,
    height: 24,
    top: 6,
    left: 6,
    borderRadius: 32,
  },

  miniKnopCircle: {
    width: 12,
    height: 12,
    top: 6,
    left: 6,
  },
  rightMiniKnopCircle: {
    left: 30,
  },

  material: {
    width: 36,
    height: 20,
  },
  materialCircle: {
    width: 20,
    height: 20,
    top: 0,
    left: 0,
  },

  rightMaterialCircle: {
    left: 16,
  },
});
