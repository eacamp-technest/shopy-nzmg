import {
  ActivityIndicator,
  Text,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {SvgImage} from './SvgImages';
import {TypographyStyles} from '../theme/typography';
import {normalize} from '../theme/metrics';
import {CommonStyles} from 'theme/common.styles';
import {ButtonTheme} from '../helpers/buttonTheme';
import {colors} from 'theme/colors';

type TPosition = 'left' | 'right';
type TSize = 'small' | 'block' | 'large';
type TTypes = 'primary' | 'secondary' | 'outlined' | 'transparent';

export interface IButton {
  text?: string | undefined;
  size?: TSize;
  types?: TTypes;
  disabled?: boolean;
  icon?: NodeRequire;
  position?: TPosition;
  loading?: boolean;
  onPress?: () => void;
  textColor?: StyleProp<TextStyle> | undefined;
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
}

export const Buttons: React.FC<IButton> = ({
  text,
  onPress,
  disabled,
  icon,
  loading,
  position = 'left',
  size = 'block',
  style,
  types = 'primary',
  textColor,
  iconColor = '#fff',
}) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const {component: rootStyles, text: textStyles} = ButtonTheme(types, {
    disabled,
    press: pressed,
  });

  const svgSize = useMemo(() => (size === 'small' ? 16 : 24), [size]);

  const renderLoading = () => {
    return loading ? (
      <ActivityIndicator
        color={textStyles.color}
        size={'small'}
        style={StyleSheet.absoluteFillObject}
      />
    ) : null;
  };

  const onPressIn = () => setPressed(true);
  const onPressOut = () => setPressed(false);

  return (
    <Pressable
      style={[
        icon ? styles.root : [styles.root, CommonStyles.alignJustifyCenterRow],
        styles[size],
        styles[position],
        rootStyles,
        text == 'Log in Instead' && styles.login,
        style,
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
      onPress={onPress}>
      <Text style={[styles.text, textStyles, textColor]}>{text}</Text>
      {icon ? (
        <SvgImage
          width={svgSize}
          height={svgSize}
          color={iconColor}
          source={icon}
        />
      ) : null}
      {renderLoading()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'transparent',
    overflow: 'hidden',
    ...CommonStyles.alignCenterJustifyBetweenRow,
  },
  text: {
    ...TypographyStyles.RegularNoneSemiBold,
    color: 'white',
    alignSelf: 'center',
  },
  left: {
    flexDirection: 'row-reverse',
  },
  pressed: {
    opacity: 0.5,
  },
  right: {},
  small: {
    backgroundColor: 'blue',
    padding: normalize('vertical', 7),
  },
  block: {
    backgroundColor: 'red',
    padding: normalize('vertical', 15),
  },
  large: {
    backgroundColor: 'green',
    padding: normalize('vertical', 15),
  },
  login: {
    backgroundColor: colors.ink.base,
  },
});
