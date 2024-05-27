import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {TypographyStyles} from 'theme/typography';
import {CommonStyles} from 'theme/common.styles';
import {SvgImage} from './SvgImages';
import {colors} from 'theme/colors';
import {Buttons} from './Buttons';
import {normalize} from 'theme/metrics';

type TIcon = {
  icon: NodeRequire;
  text?: string;
  subText?: string | undefined;
  width?: number;
  height?: number;
  color?: string;
};
type NavbarActions =
  | 'icon'
  | 'icon-text'
  | 'text'
  | 'button'
  | 'none'
  | 'icon-subText';
type NavbarSide = NodeRequire | TIcon | string | React.ReactNode | undefined;

interface INavBar {
  type?: 'large' | 'standard';
  title?: string;
  left?: NavbarSide;
  right?: NavbarSide;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftActionType?: NavbarActions;
  rightActionType?: NavbarActions;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

export const Navbar: React.FC<INavBar> = ({
  type = 'standard',
  leftActionType,
  rightActionType,
  left,
  right,
  title,
  style,
  rootStyle,
  textStyle,
  onLeftPress,
  onRightPress,
}) => {
  if (type === 'large') {
    return (
      <View style={styles.large}>
        <Text style={[TypographyStyles.title2, textStyle]}>{title}</Text>

        {rightActionType === 'button' ? (
          <Buttons
            types="outlined"
            size="small"
            text={right?.toString()}
            onPress={onRightPress}
          />
        ) : rightActionType === 'icon' ? (
          <SvgImage color={'white'} source={right} />
        ) : null}
      </View>
    );
  }

  const renderActions = (
    actionType: NavbarActions | undefined,
    data: NavbarSide,
    side: 'left' | 'right' = 'left',
  ) => {
    const hasIcon = data && typeof data === 'object' && 'icon' in data;
    const onPressAction = side === 'left' ? onLeftPress : onRightPress;

    switch (actionType) {
      case 'text':
        return (
          <Text numberOfLines={2} style={[styles.textType, textStyle]}>
            {data as string}
          </Text>
        );

      case 'icon':
        if (hasIcon) {
          const {icon, ...restOfIcon} = data as TIcon;
          return (
            <SvgImage
              color={colors.ink.darkest}
              source={icon}
              {...restOfIcon}
            />
          );
        }

        return (
          <SvgImage color={colors.ink.darkest} source={data as NodeRequire} />
        );

      case 'icon-text':
        if (hasIcon) {
          const {icon, text, ...restOfIcon} = data as TIcon;
          return (
            <View
              style={[
                CommonStyles.alignCenterJustifyBetweenRow,
                side === 'right' && CommonStyles.rowReverse,
                styles.text,
              ]}>
              <SvgImage source={icon} {...restOfIcon} />

              <Text style={TypographyStyles.RegularNoneSemiBold}>{text}</Text>
            </View>
          );
        }
      case 'icon-subText':
        if (hasIcon) {
          const {icon, text, subText, ...restOfIcon} = data as TIcon;
          return (
            <View
              style={[
                styles.container,
                CommonStyles.alignCenterJustifyBetweenRow,
                side === 'right' && CommonStyles.rowReverse,
              ]}>
              <SvgImage source={icon} {...restOfIcon} />
              <View>
                <Text style={TypographyStyles.RegularNoneSemiBold}>{text}</Text>
                <Text style={styles.subText}>{subText}</Text>
              </View>
            </View>
          );
        }

        return null;

      case 'button':
        return (
          <Buttons
            types="primary"
            size="small"
            text={data?.toString()}
            onPress={onPressAction}
          />
        );

      default:
        null;
    }
  };

  return (
    <View style={[styles.root, rootStyle]}>
      <Pressable
        disabled={!onLeftPress || leftActionType === 'button'}
        onPress={onLeftPress}
        style={[styles.action, !leftActionType && styles.hide, style]}>
        {renderActions(leftActionType, left, 'left')}
      </Pressable>
      <Text style={TypographyStyles.title3}>{title}</Text>
      <Pressable
        disabled={!onRightPress || rightActionType === 'button'}
        onPress={onRightPress}
        style={[
          styles.action,
          styles.actionRight,
          !rightActionType && styles.hide,
        ]}>
        {renderActions(rightActionType, right, 'right')}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
    paddingVertical: normalize('vertical', 12),
  },
  large: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
    paddingVertical: normalize('vertical', 16),
  },
  action: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  actionRight: {
    alignItems: 'flex-end',
  },
  textType: {
    ...TypographyStyles.LargeNoneSemiBold,
    color: colors.primary.base,
  },
  hide: {
    opacity: 0,
  },
  subText: {
    color: colors.lavender.base,
    backgroundColor: colors.lavender.lightest,
    paddingHorizontal: normalize('horizontal', 12),
    paddingVertical: normalize('vertical', 4),
    alignSelf: 'flex-start',
    borderRadius: 100,
  },
  text: {
    gap: 12,
  },
  container: {
    gap: 16,
  },
});
