import {View, StyleSheet} from 'react-native';
import React from 'react';
import {CommonStyles} from 'theme/common.styles';
import {colors} from 'theme/colors';
import {SvgImage} from './SvgImages';

interface ICheckBox {
  setCheck: boolean;
  types?: 'circle' | 'square';
}

export const CheckBox: React.FC<ICheckBox> = ({setCheck, types = 'circle'}) => {
  return (
    <View
      style={[
        styles.checkbox,
        setCheck ? styles.active : styles.passive,
        types === 'square' && styles.square,
      ]}>
      {types === 'circle' && setCheck ? (
        <View style={styles.circle} />
      ) : types === 'square' && setCheck ? (
        <SvgImage
          width={15}
          height={15}
          source={require('/assets/vectors/check.svg')}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.blue.base,
  },
  passive: {
    backgroundColor: colors.white,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.sky.base,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: colors.sky.base,
    width: 24,
    height: 24,
    borderRadius: 30,
    ...CommonStyles.alignJustifyCenter,
  },
  square: {
    borderRadius: 4,
  },
});
