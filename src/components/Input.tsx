import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  Pressable,
  FlatList,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SvgImage } from './SvgImages';
import { TypographyStyles } from 'theme/typography';
import { colors } from 'theme/colors';
import { standardHitSlopSize } from 'theme/consts.styles';
import { CommonStyles } from 'theme/common.styles';
import { ICountry } from 'data/countries';
import { keyboardHideEvent } from 'constants/common.consts';

export type TIcon = {
  source: NodeRequire;
  color?: string;
  width?: number;
  height?: number;
  position?: 'left' | 'right';
};

export interface IInput {
  type?: 'text' | 'phone' | 'password' | 'select';
  label?: string;
  caption?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  icon?: TIcon | NodeRequire;
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  maxLength?: number;
  setValue?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onInputPress?: () => void;
  onIconPress?: () => void;
  options?: ICountry[];
  onSelect?: (option: ICountry) => void;
  multiLine?: boolean;
}
export const Input: React.FC<IInput> = ({
  value,
  type = 'text',
  setValue,
  icon,
  inputStyle,
  multiLine,
  options,
  onSelect,
  onIconPress,
  ...props
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(
    type === 'password',
  );
  const [open, setOpen] = useState<boolean>(false)

  const isMoreIcon = useMemo(
    () =>
      ('position' in (icon ?? {}) && (icon as TIcon)?.position === 'right') ||
      type === 'password' || type === 'select',
    [icon, type],
  );

  const isPressable = props.onInputPress instanceof Function;

  const renderIcon = useMemo(() => {
    if (type === 'password') {
      return (
        <Pressable hitSlop={standardHitSlopSize}>
          <SvgImage
            source={
              secureTextEntry
                ? require('../assets/vectors/eye-off.svg')
                : require('../assets/vectors/eye .svg')
            }
            color={colors.ink.base}
            width={24}
            height={24}
            onPress={() => setSecureTextEntry(state => !state)}
          />
        </Pressable>
      );
    }
    if (type === 'select') {
      return (
        <Pressable onPress={() => setOpen(state => !state)} hitSlop={standardHitSlopSize}>
          <SvgImage
            source={
              open
                ? require('../assets/vectors/chevron-up.svg')
                : require('../assets/vectors/chevron-down.svg')
            }
            color={colors.ink.base}
            width={24}
            height={24}

          />
        </Pressable>
      );
    }
    if (!icon) {
      return null;
    }
    if ('source' in icon) {
      return (
        <SvgImage
          source={icon.source}
          width={icon.width}
          color={icon.color}
          height={icon.height}
        />
      );
    }
    return (
      <Pressable onPress={onIconPress}>
        <SvgImage
          source={icon}
          color={props.disabled ? colors.sky.base : colors.ink.base}
        />
      </Pressable>
    );
  }, [icon, props.disabled, secureTextEntry, open, type]);

  const handleOnFocused = () => {
    setFocused(true);
    props?.onFocus?.();
  };
  const handleOnBlur = () => {
    setFocused(false);
    props?.onBlur?.();
  };

  const handleSelect = (option: ICountry) => {
    setValue?.(option.label);
    setOpen(false);
    onSelect?.(option);
  };

  return (
    <View style={[styles.root, props?.style]}>
      {props.label ? (
        <Text style={TypographyStyles.RegularNoneSemiBold}>{props.label}</Text>
      ) : null}
      <View
        style={[
          styles.wrapper,
          focused && styles.focused,
          props.disabled && styles.wrapperDisabled,
          isMoreIcon && CommonStyles.rowReverse,
          inputStyle,
        ]}>
        {renderIcon}
        <TextInput
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          value={value}
          onFocus={handleOnFocused}
          onBlur={handleOnBlur}
          onPressIn={props.onInputPress}
          autoCapitalize="none"
          maxLength={props.maxLength}
          // editable={!isPressable ?? !props.disabled}
          secureTextEntry={secureTextEntry}
          onChangeText={setValue}
          multiline={multiLine}
          placeholderTextColor={
            props.disabled ? colors.sky.base : colors.ink.lighter
          }
          style={styles.input}
        />
      </View>
      {type === 'select' && open && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <Pressable onPress={() => {
                handleSelect(item)
                keyboardHideEvent
              }

              }>
                <Text style={styles.option}>{item.label}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item.value}
            style={styles.flatlist}
          />
        </View>)}
      {props.caption || props.errorMessage ? (
        <Text
          style={[
            styles.caption,
            props?.errorMessage ? styles.error : undefined,
          ]}>
          {props.errorMessage ?? props.caption}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 12,
  },
  focused: {
    borderWidth: 2,
    borderColor: colors.primary.base,
  },
  wrapperDisabled: {
    backgroundColor: colors.sky.lighter,
    borderColor: colors.sky.lighter,
    color: colors.sky.base,
  },
  error: {
    color: colors.primary.base,
  },
  caption: {
    ...TypographyStyles.SmallNormalRegular,
    color: colors.ink.lighter,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.sky.light,
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 12,
    height: 48,
  },
  input: {
    height: '100%',
    flex: 1,
    flexGrow: 1,
    borderColor: 'red',
    ...TypographyStyles.RegularNoneRegular,
  },
  flatlist: {
    maxHeight: 200,
    gap: 6
  },
  dropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: colors.sky.light,
    borderRadius: 8,
    zIndex: 999,
    backgroundColor: colors.white,
  },
  option: {
    ...TypographyStyles.RegularNoneRegular,
    color: colors.ink.base,
    paddingHorizontal: 16,
    paddingBottom: 16
  }
});