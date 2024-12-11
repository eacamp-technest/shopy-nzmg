import {StyleSheet, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Input, IInput, TIcon} from './Input';
import {SvgImage} from './SvgImages';
import {colors} from 'theme/colors';
import {standardHitSlopSize} from 'theme/Const.styles';
import {normalize} from 'theme/metrics';

export interface ISearchBar extends Omit<IInput, 'type'> {
  leftIcon?: TIcon | NodeRequire;
  rightIcon?: TIcon | NodeRequire;
  onRightPress?: () => void;
}

export const SearchBar: React.FC<ISearchBar> = ({
  leftIcon,
  rightIcon,
  onRightPress,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState<string>(props.value || '');

  const handleRightIcon = () => {
    if (onRightPress) {
      onRightPress();
    } else {
      setSearchValue('');
      props.setValue?.('');
    }
  };

  const renderIcon = (icon: TIcon | NodeRequire) => {
    if ((icon as TIcon).source) {
      const typedIcon = icon as TIcon;
      return (
        <SvgImage
          source={typedIcon.source}
          width={typedIcon.width || 24}
          height={typedIcon.height || 24}
          color={typedIcon.color || colors.ink.base}
        />
      );
    } else {
      return (
        <SvgImage
          source={icon as NodeRequire}
          width={24}
          height={24}
          color={colors.ink.base}
        />
      );
    }
  };
  return (
    <View style={styles.searchBar}>
      {leftIcon && renderIcon(leftIcon)}
      <Input
        {...props}
        value={searchValue}
        setValue={setSearchValue}
        icon={rightIcon ? undefined : props.icon}
        style={[styles.input]}
      />
      {rightIcon && (
        <Pressable onPress={handleRightIcon} hitSlop={standardHitSlopSize}>
          {renderIcon(rightIcon)}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: normalize('horizontal', 12),
    height: normalize('height', 48),
  },
  input: {
    flex: 1,
    color: colors.ink.lighter,
  },
});
